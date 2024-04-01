"use client";

import { Canvas } from "@react-three/fiber";
import { Center, Environment } from "@react-three/drei";
import { OrbitControls, Stage } from "@react-three/drei/core";
import TeslaModel3 from "./TeslaModel3";
import { useSearchParams } from "next/navigation";
import { Edit } from "..";
import { useState } from "react";

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
  const [selectedMaterials, setSelectedMaterials] = useState<string>("#ffffff");

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
    <div>
      <div className="z-0 h-full absolute w-full top-0 left-0">
        <Canvas className="w-full max-w-full h-full transition-all ease-in relative -z-10">
          <ambientLight />
          <OrbitControls />
          {isBackgroundEnable && <Environment preset={selectedEnvironment} background blur={0.5} />}
          <Center>
            <Stage environment={selectedEnvironment}>
              <TeslaModel3 material={selectedMaterials} />
            </Stage>
          </Center>
        </Canvas>
      </div>

      <Edit setMaterial={(m) => setSelectedMaterials(m)} />
    </div>
  );
}
