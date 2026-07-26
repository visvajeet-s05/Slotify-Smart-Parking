import { createServer } from "node:http";
import { Server } from "socket.io";
import { createClient } from "redis";

type Role = "OWNER" | "CUSTOMER" | "AI";
type Delta = { lotId: string; slotId: string; status: string; source: Role; at: number };
const priority: Record<Role, number> = { AI: 1, CUSTOMER: 2, OWNER: 3 };
const last = new Map<string, Delta>();
const http = createServer();
const io = new Server(http, { cors: { origin: process.env.WEB_ORIGIN?.split(",") ?? false } });
io.on("connection", socket => {
  socket.on("subscribe:lot", (lotId: string) => typeof lotId === "string" && socket.join(`lot:${lotId}`));
  socket.on("unsubscribe:lot", (lotId: string) => socket.leave(`lot:${lotId}`));
});
async function start() {
  const redis = createClient({ url: process.env.REDIS_URL });
  await redis.connect();
  const stream = process.env.REDIS_STREAM ?? "slotify:events";
  const group = "websocket-relay";
  try { await redis.xGroupCreate(stream, group, "$", { MKSTREAM: true }); } catch (error: unknown) { if (!(error instanceof Error) || !error.message.includes("BUSYGROUP")) throw error; }
  for (;;) {
    const result = await redis.xReadGroup(group, process.env.CONSUMER_NAME ?? "relay-1", { key: stream, id: ">" }, { COUNT: 100, BLOCK: 1000 });
    for (const batch of result ?? []) for (const message of batch.messages) {
      const raw = message.message.data;
      if (!raw) continue;
      const delta = JSON.parse(raw) as Delta;
      const key = `${delta.lotId}:${delta.slotId}`;
      const previous = last.get(key);
      if (!previous || priority[delta.source] >= priority[previous.source] || delta.at > previous.at + 5_000) {
        last.set(key, delta); io.to(`lot:${delta.lotId}`).emit("slot:delta", delta);
      }
      await redis.xAck(stream, group, message.id);
    }
  }
}
start().catch(error => { console.error(error); process.exitCode = 1; });
http.listen(Number(process.env.PORT ?? 3002));
