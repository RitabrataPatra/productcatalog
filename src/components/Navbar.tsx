"use client"
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";;
import { CreateProdM } from "./CreateProdM";

const Navbar = () => {
  const [search, setSearch] = React.useState("");
  return (
    <header className="border bg-neutral-50">
      {/* Navbar */}
      <nav className="flex justify-center items-center gap-8 my-4">
        {/* App logo */}
        <div>
          <Image
            src="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full border border-neutral-900 shadow-lg"
          />
        </div>

        {/* Search input */}
        <div>
          <Input
            type="text"
            placeholder="Search Products"
            name="search"
            className="sm:min-w-[800px] w-full bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Create new Product button */}
        <div>
          <CreateProdM />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
