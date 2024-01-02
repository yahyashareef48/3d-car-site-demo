import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="absolute z-20 top-0 left-0 flex justify-center w-full p-4">
      <button
        onClick={() => {
          let params = new URLSearchParams(window.location.search);
          params.set("edit", "false");
          router.push(`?${params.toString()}`);
        }}
      >
        <Image alt="logo" className="mt-5" width={30} height={30} src="/images/LOGO.webp" />
      </button>
    </nav>
  );
}
