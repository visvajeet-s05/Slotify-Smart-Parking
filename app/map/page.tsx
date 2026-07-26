"use client";
import { useEffect, useState } from "react";
const colour: Record<string, string> = { AVAILABLE: "#10B981", RESERVED: "#F59E0B", OCCUPIED: "#EF4444", EV_CHARGING: "#3B82F6" };
export default function MapPage() {
  const [slots, setSlots] = useState<{id:string; label:string; status:string}[]>([]);
  useEffect(() => { fetch("/api/v1/curb/cds").then(() => setSlots([])).catch(() => undefined); }, []);
  return <main className="min-h-screen bg-slate-950 p-8 text-white"><h1 className="text-3xl font-bold">Live spatial canvas</h1><p className="mt-2 text-slate-300">Connect Mapbox and Deck.gl using a public token to render calibrated 3D polygons.</p><section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">{slots.map(slot => <div key={slot.id} className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl" style={{borderLeftColor: colour[slot.status]}}>{slot.label}: {slot.status}</div>)}</section></main>;
}
