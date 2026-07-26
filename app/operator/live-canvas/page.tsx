"use client";
import { useState } from "react";
export default function OperatorCanvas() {
  const [points, setPoints] = useState<{x:number;y:number}[]>([]);
  return <main className="min-h-screen bg-slate-950 p-6 text-white"><h1 className="text-2xl font-bold">Operator digital twin</h1><p className="mt-1 text-slate-300">Click the camera canvas four times to define a slot ROI.</p><div onClick={e=>{const r=e.currentTarget.getBoundingClientRect(); setPoints(p=>p.length===4?[]:[...p,{x:e.clientX-r.left,y:e.clientY-r.top}]);}} className="relative mt-6 h-[460px] max-w-4xl cursor-crosshair overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-slate-700 to-slate-950">{points.map((point,index)=><i key={index} className="absolute h-3 w-3 rounded-full bg-amber-400" style={{left:point.x-6,top:point.y-6}} />)}<span className="absolute bottom-4 left-4 rounded bg-black/60 px-3 py-2">Live RTSP preview · {points.length}/4 calibration points</span></div></main>;
}
