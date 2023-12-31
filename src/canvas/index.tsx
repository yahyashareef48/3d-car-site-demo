"use client";

import { Canvas } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { OrbitControls, Stage } from "@react-three/drei/core";
import TeslaModel3 from "./TeslaModel3";
import { useSearchParams } from "next/navigation";

export type EnvironmentsType =
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset"
  | "warehouse";

export default function Index() {
  const searchParam = useSearchParams();

  return (
    <Canvas className="w-full max-w-full h-full transition-all ease-in relative -z-10">
      <ambientLight />
      <OrbitControls />
      <Center>
        <Stage environment={(searchParam.get("e") as EnvironmentsType) || "city"}>
          <TeslaModel3 />
        </Stage>
      </Center>
    </Canvas>
  );
}
