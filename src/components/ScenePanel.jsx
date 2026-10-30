"use client";

import dynamic from "next/dynamic";
const CoffeeScene = dynamic(() => import("./CoffeeScene"), { ssr: false, loading: () => <div className="scene-fallback"/> });
export default function ScenePanel() { return <div className="scene-panel"><CoffeeScene/></div>; }
