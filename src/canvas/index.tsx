"use client";

import { Canvas } from "@react-three/fiber";
import { Center, Environment } from "@react-three/drei";
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

  const environments = [
    "apartment",
    "city",
    "dawn",
    "forest",
    "lobby",
    "night",
    "park",
    "studio",
    "sunset",
    "warehouse",
  ];

  const selectedEnvironment = environments.includes(searchParam.get("e") as EnvironmentsType)
    ? (searchParam.get("e") as EnvironmentsType)
    : "city";

  const isBackgroundEnable = searchParam.get("bg") && searchParam.get("bg") === "true";

  return (
    <Canvas className="w-full max-w-full h-full transition-all ease-in relative -z-10">
      <ambientLight />
      <OrbitControls />
      {isBackgroundEnable && <Environment preset={selectedEnvironment} background blur={0.5} />}
      <Center>
        <Stage environment={selectedEnvironment}>
          <TeslaModel3 />
        </Stage>
      </Center>
    </Canvas>
  );
}
