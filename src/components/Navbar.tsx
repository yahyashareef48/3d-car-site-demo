import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="absolute flex justify-center w-full p-4">
      <Image alt="logo" width={30} height={30} src="/images/LOGO.webp" />
    </nav>
  );
}
