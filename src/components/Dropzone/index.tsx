import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Accept = "image/jpeg" | "image/png" | "image/avif";

export default function Dropzone({ setImage }: { setImage: (i: string) => void }) {
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      let url = URL.createObjectURL(acceptedFiles[0]);
      setImage(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpeg", ".jpg", ".avif", ".webp"],
    },
  });

  return (
    <div
      className="border-2 border-dashed border-[#464646] cursor-pointer rounded h-full flex flex-col justify-center items-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Image src="/images/drag-and-drop.png" width={100} height={100} alt="drag and drop image" />
      {isDragActive ? (
        <p className="font-sans text-xs p-4 min-w-[296.33.px]">Drop the image here ...</p>
      ) : (
        <p className="font-sans text-xs p-4">
          Drag 'n' drop an image here, or click to select image.
        </p>
      )}
    </div>
  );
}
