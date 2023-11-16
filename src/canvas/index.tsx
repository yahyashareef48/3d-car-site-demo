"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei/core";
import MclarenP1 from "./MclarenP1";

export default function Index() {
  return (
    <Canvas className="w-full max-w-full h-full transition-all ease-in relative -z-10">
      <ambientLight />
      <OrbitControls
        minDistance={3.5}
        maxDistance={4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
      <Center>
        <MclarenP1 />
      </Center>
    </Canvas>
  );
}
