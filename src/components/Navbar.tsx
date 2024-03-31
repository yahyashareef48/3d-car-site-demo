import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute z-20 top-0 left-0 flex justify-center w-full p-4">
      <Link href="/">
        <Image alt="logo" className="mt-5" width={30} height={30} src="/images/LOGO.webp" />
      </Link>
    </nav>
  );
}
