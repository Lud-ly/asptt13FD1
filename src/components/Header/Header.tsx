"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "../Sections/components/Navigation";

export const Header = () => {
  const handleLogoClick = () => {
    localStorage.removeItem("hasShownSplash");
  };

  return (
    <div
      className="p-3 flex flex-row justify-between items-center"
      style={{ backgroundColor: "#fff", color: "#fff" }}
    >
      <Link href="/" onClick={handleLogoClick}>
        <Image
          src="/images/logo.jpg"
          alt="logo asptt foot"
          width={70}
          height={70}
          priority
        />
      </Link>
      <Navigation />
    </div>
  );
};
