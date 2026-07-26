import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const lots = await prisma.parkinglot.findMany({ include: { slots: true } });
  return NextResponse.json({ type: "FeatureCollection", features: lots.map(lot => ({ type: "Feature", id: lot.id, geometry: { type: "Point", coordinates: [lot.lng, lot.lat] }, properties: { name: lot.name, available: lot.slots.filter(slot => slot.status === "AVAILABLE").length, occupied: lot.slots.filter(slot => slot.status === "OCCUPIED").length, updated_at: new Date().toISOString() } })) }, { headers: { "Content-Type": "application/geo+json" } });
}
