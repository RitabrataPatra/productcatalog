"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { CreateProdM } from "./CreateProdM";
import {Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {  useSession } from "next-auth/react";
// import Avatar from "./Avatar";
import Image from "next/image";
import DropAuth from "./DropAuth";

const Navbar = () => {
  const { data: session } = useSession();
  // console.log(session?.user)
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
        <div className="flex items-center bg-white px-4 rounded-full"> 
          {/* logo */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={1}
            className="rounded-full"
            style={{ height: "auto" , width: "52px"}} 
          />
          <h2 className="text-xl font-semibold">Catalog</h2>
        </div>
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

          <div className="flex items-center gap-4">
            {!session?.user ? (
              <Button variant={"default"} disabled={true}>
                Please Login
              </Button>
            ) : (
              <CreateProdM />
            )}
          </div>

          {/* login logout button */}
          <DropAuth session={session}/>
          {/* {session?.user ? (
            <>
            
            <Button
              onClick={() => signOut()}
              variant={"destructive"}
              className="hover:bg-red-400"
            >
              <GithubIcon size={20} />
              <p>Logout</p>
            </Button></>
          ) : (
            <Button onClick={() => signIn("github")} variant={"default"}>
              Login
            </Button>
          )} */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
