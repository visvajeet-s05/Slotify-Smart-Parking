"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
export default function SlotPicker() {
  const { lotId } = useParams<{lotId:string}>(); const [selected, setSelected] = useState<string>();
  return <main className="min-h-screen bg-slate-950 p-6 text-white"><h1 className="text-2xl font-bold">Reserve a space</h1><p className="mt-1 text-slate-300">Lot {lotId}</p><div className="mt-8 grid max-w-lg grid-cols-4 gap-3">{Array.from({length:16},(_,i) => <button key={i} onClick={()=>setSelected(`A-${i+1}`)} className="aspect-square rounded-lg border border-emerald-400/50 bg-emerald-500/15 text-sm hover:bg-emerald-500/30">A-{i+1}</button>)}</div>{selected && <aside className="fixed bottom-0 left-0 right-0 border-t border-white/20 bg-slate-900/95 p-6 backdrop-blur-xl"><b>{selected}</b><p className="mt-1 text-slate-300">120 m away · ₹50/hour · EV availability shown live</p><button className="mt-3 rounded bg-emerald-500 px-4 py-2 font-semibold text-slate-950">Reserve now</button></aside>}</main>;
}
