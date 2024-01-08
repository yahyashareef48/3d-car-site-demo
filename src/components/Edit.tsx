"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AnimatedButton } from "../components";

export default function Edit() {
  const router = useRouter();
  const [color, setColor] = useState("");
  const [colorPicker, setColorPicker] = useState(false);
  const [environmentPicker, setEnvironmentPicker] = useState(false);

  const isFirstOptionsOpen = !colorPicker && !environmentPicker;

  const environments = [
    "Apartment",
    "City",
    "Down",
    "Forest",
    "Lobby",
    "Night",
    "Park",
    "Studio",
    "Sunset",
    "Warehouse",
  ];

  console.log(isFirstOptionsOpen);
  console.log(colorPicker);
  console.log(environmentPicker);

  return (
    <div
      className="absolute text-black flex items-center h-full z-10 color-picker"
      style={{ pointerEvents: "none" }}
    >
      <div className="h-max min-h-[285px] min-w-[285px] relative flex items-center">
        <div className="absolute" style={{ pointerEvents: "auto" }}>
          <AnimatePresence>
            {isFirstOptionsOpen && (
              <motion.div initial={{ x: -500 }} animate={{ x: 10 }} exit={{ x: -500 }}>
                <AnimatedButton onClick={() => setColorPicker(true)}>
                  Open Color Selector
                </AnimatedButton>

                <AnimatedButton onClick={() => setEnvironmentPicker(true)}>
                  Select Environment
                </AnimatedButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute" style={{ pointerEvents: "auto" }}>
          <AnimatePresence>
            {!isFirstOptionsOpen && (
              <motion.div initial={{ x: -500 }} animate={{ x: 10 }} exit={{ x: -500 }}>
                {colorPicker && (
                  <div>
                    <ChromePicker
                      // @ts-ignore
                      width={300}
                      color={color ? color : "#fff"}
                      onChangeComplete={(c) => {
                        setColor(c.hex);
                        let params = new URLSearchParams(window.location.search);
                        params.set("color", c.hex.replace("#", ""));
                        router.push(`?${params.toString()}`);
                      }}
                    />
                    <AnimatedButton right onClick={() => setColorPicker(false)}>
                      Close Color Picker
                    </AnimatedButton>
                  </div>
                )}

                {environmentPicker && (
                  <div className="overflow-y-scroll">
                    <AnimatedButton right onClick={() => setEnvironmentPicker(false)}>
                      Close Color Picker
                    </AnimatedButton>

                    {environments.map((e) => (
                      <AnimatedButton
                        onClick={() => {
                          let params = new URLSearchParams(window.location.search);
                          params.set("e", e.toLowerCase());
                          router.push(`?${params.toString()}`);
                        }}
                      >
                        {e}
                      </AnimatedButton>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
