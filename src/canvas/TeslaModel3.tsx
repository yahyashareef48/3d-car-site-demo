"use client";

import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSearchParams, useRouter } from "next/navigation";

export default function TeslaModel3() {
  const router = useRouter();
  const [materialName, setMaterialName] = useState(""); // Initialize state for the material name
  const coolDown = useRef(false);

  const searchParam = useSearchParams(); // Use the useSearchParams hook to get the current URL search parameters

  // const router = useRouter();

  const gltf = useGLTF("/3d-models/tesla_model_3.glb"); // Use the useGLTF hook from drei to load the GLTF model

  // Traverse through the GLTF model
  gltf.scene.traverse((child: any) => {
    // If the child is a mesh
    if (child.type === "Mesh") {
      // If the material name of the child matches the state material name
      if (child.material.name === materialName) {
        child.material.color.set(`#${searchParam.get("color")}`); // Set the color of the material to the color from the URL search parameters
      }
    }
  });

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    params.set("l", "false");
    router.push(`?${params.toString()}`);
  }, []);

  // Return the JSX for rendering
  return (
    // Define a mesh component
    <mesh
      // Set the onClick handler to update the material name state
      onDoubleClick={(e: any) => {
        // Check if the cool down period is not active
        if (!coolDown.current) {
          setMaterialName(e.object.material.name); // If not in cooldown, set the material name state to the name of the clicked object's material

          coolDown.current = true; // Activate the cool down period

          // After 1 second (1000 milliseconds), deactivate the cool down period
          setTimeout(() => {
            coolDown.current = false;
          }, 1000);
        }
      }}
    >
      {/* Define the lights for the scene */}
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 10, 0]} intensity={1} />
      {/* Render the GLTF model */}
      <primitive object={gltf.scene} />
    </mesh>
  );
}
