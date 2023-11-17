import { ReactColorPicker } from "react-color-picker-tool";

export default function Edit({ color, setColor }: { color: string; setColor: any }) {
  return (
    <div className="absolute text-black font-serif top-10 left-0 z-10">
      <ReactColorPicker
        color={color}
        onChange={(colors) => setColor(colors.rgba)}
      ></ReactColorPicker>
    </div>
  );
}
