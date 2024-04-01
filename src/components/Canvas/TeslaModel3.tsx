"use client";

import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSearchParams, useRouter } from "next/navigation";
import { TextureLoader } from "three";

export default function TeslaModel3({ material }: { material: string }) {
  const router = useRouter();
  const [objectUUID, setObjectUUID] = useState(""); // Initialize state for the object UUID

  const coolDown = useRef(false);

  const searchParam = useSearchParams(); // Use the useSearchParams hook to get the current URL search parameters

  // const router = useRouter();

  const gltf = useGLTF("/3d-models/tesla_model_3.glb"); // Use the useGLTF hook from drei to load the GLTF model
  const textureLoader = new TextureLoader();

  useEffect(() => {
    // Traverse through the GLTF model
    gltf.scene.traverse((child: any) => {
      // If the child is a mesh
      if (child.type === "Mesh") {
        // try {
        //   console.log(child.geometry.faceVertexUvs[0]);
        // } catch (error) {
        //   console.log(error)
        // }

        // If the material name of the child matches the state material name
        if (objectUUID === child.userData.new_unique_id) {
          // Clone the material
          child.material = child.material.clone();

          // Load the image and set it as the map (texture) of the material
          if (material?.startsWith("blob") && material) {
            textureLoader.load(material, (texture) => {
              child.material.map = texture;
              child.material.needsUpdate = true; // Update the material
            });
          } else if (material === "remove_texture" && child.material.map) {
            console.log("in2: ", material);
            child.material.map.dispose(); // Dispose of the texture
            child.material.map = null; // Remove the texture from the material
            child.material.needsUpdate = true; // Update the material
          } else {
            child.material.color.set(material); // Set the color of the material to the color from the URL search parameters
          }
        }
      }
    });
  }, [material, objectUUID]);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    params.set("l", "false");
    router.push(`?${params.toString()}`);

    gltf.scene.rotation.set(0, 3, 0); // Rotate the mesh by 90 degrees on the Z-axis
  }, []);

  // Return the JSX for rendering
  return (
    // Define a mesh component
    <mesh
      // Set the onClick handler to update the material name state
      onDoubleClick={(e: any) => {
        // Check if the cool down period is not active
        if (!coolDown.current) {
          setObjectUUID(e.object.userData.new_unique_id); // If not in cooldown, set the object UUID state to the name of the clicked object's UUID

          coolDown.current = true; // Activate the cool down period

          // After 1 second (1000 milliseconds), deactivate the cool down period
          setTimeout(() => {
            coolDown.current = false;
          }, 0);
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
