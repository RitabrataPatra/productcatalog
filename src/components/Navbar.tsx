"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { CreateProdM } from "./CreateProdM";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Function to handle the search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Debounce effect to delay the API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay before making the API call

    // Cleanup the previous timer when search input changes
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // Effect to update the URL whenever the debounced search value changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.push(`/?${params.toString()}`);
  }, [debouncedSearch, router]);

  return (
    <header className="border bg-neutral-50">
      <nav className="flex justify-between items-center px-4 py-4 md:justify-center md:gap-8">
        <div className="flex items-center">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full border border-neutral-900 shadow-lg"
          />
        </div>

        {isMenuOpen && (
          <h1 className="text-2xl font-bold">Product Catelog App</h1>
        )}

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-neutral-800 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen
              ? "max-h-40 opacity-100 border border-b-neutral-300"
              : "max-h-0 opacity-0"
          } absolute top-16 left-0 w-full bg-neutral-50 md:static md:w-auto md:max-h-none md:opacity-100 md:flex md:gap-8 md:items-center`}
        >
          <div className="w-full md:w-auto px-4 py-2 md:p-0">
            <Input
              type="text"
              placeholder="Search Products"
              name="search"
              className="sm:min-w-[800px] w-full bg-white"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="px-4 py-2 md:p-0">
            <CreateProdM />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
