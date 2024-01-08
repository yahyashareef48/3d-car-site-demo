"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { OrbitControls, Stage } from "@react-three/drei/core";
import TeslaModel3 from "./TeslaModel3";

export default function Index() {
  return (
    <Canvas className="w-full max-w-full h-full transition-all ease-in relative -z-10">
      <ambientLight />
      <OrbitControls />
      <Center>
        <Stage environment="city">
          <TeslaModel3 />
        </Stage>
      </Center>
    </Canvas>
  );
}
