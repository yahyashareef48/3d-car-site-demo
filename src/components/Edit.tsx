"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AnimatedButton } from "../components";
import { EnvironmentsType } from "@/canvas";

export default function Edit() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const [color, setColor] = useState("");
  const [colorPicker, setColorPicker] = useState(false);
  const [environmentPicker, setEnvironmentPicker] = useState(false);
  const [backgroundEnable, setBackgroundEnable] = useState(false);

  const isFirstOptionsOpen = !colorPicker && !environmentPicker;
  const isBackgroundEnable = searchParam.get("bg") && searchParam.get("bg") === "true";

  const environments = [
    "Apartment",
    "City",
    "Dawn",
    "Forest",
    "Lobby",
    "Night",
    "Park",
    "Studio",
    "Sunset",
    "Warehouse",
  ];

  return (
    <div
      className="color-picker absolute text-black flex items-center h-full z-10"
      style={{ pointerEvents: "none" }}
    >
      <div className="h-max relative flex items-center">
        <div className="absolute" style={{ pointerEvents: "auto" }}>
          <AnimatePresence>
            {isFirstOptionsOpen && (
              <motion.div initial={{ x: -500 }} animate={{ x: 10 }} exit={{ x: -500 }}>
                <div className="h-max min-w-max flex flex-col gap-2">
                  {innerWidth > 576 ? (
                    <>
                      <AnimatedButton onClick={() => setColorPicker(true)}>
                        Color Picker
                      </AnimatedButton>
                      <AnimatedButton onClick={() => setEnvironmentPicker(true)}>
                        Environments
                      </AnimatedButton>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setColorPicker(true)}>
                        <img
                          className="w-14"
                          src="/images/color-wheel.webp"
                          alt="Open Color Picker"
                        />
                      </button>
                      <button onClick={() => setEnvironmentPicker(true)}>
                        <img
                          className="w-14"
                          src="/images/environment.webp"
                          alt="Select Environments"
                        />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute" style={{ pointerEvents: "auto" }}>
          <AnimatePresence>
            {!isFirstOptionsOpen && (
              <motion.div initial={{ x: -500 }} animate={{ x: 10 }} exit={{ x: -500 }}>
                {colorPicker && (
                  <div className="flex flex-col gap-1">
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
                  <div className="flex flex-col gap-2 min-w-max">
                    <AnimatedButton right onClick={() => setEnvironmentPicker(false)}>
                      Go Back
                    </AnimatedButton>

                    <AnimatedButton
                      onClick={() => {
                        let params = new URLSearchParams(window.location.search);
                        params.set("bg", (!backgroundEnable).toString());
                        router.push(`?${params.toString()}`);
                        setBackgroundEnable(!backgroundEnable);
                      }}
                    >
                      {isBackgroundEnable ? "Disable" : "Enable"} Background
                    </AnimatedButton>

                    <div className="overFlow-y-box overflow-y-scroll max-h-[50vh] flex flex-col gap-2">
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
