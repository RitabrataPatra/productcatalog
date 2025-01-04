"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { CreateProdM } from "./CreateProdM";
import { GithubIcon, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session  ,} = useSession()
  console.log(session?.user)
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
            src={session?.user?.image || "https://imgs.search.brave.com/01loLPoF2OPdOFYcM13q8ZPoKICaegqhr0FF34a1HEY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVByb2ZpbGUt/UE5HLUltYWdlcy5w/bmc"}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full border border-neutral-400 shadow-lg"
          />
        </div>

        {/* {!isMenuOpen ? (
          <h1 className="text-2xl font-bold">Product Catelog App</h1>
        ) : null} */}

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
            {
              !session?.user ? 
              <Button variant={"default"} disabled={true}>Please Login</Button>
              :  <CreateProdM />
            }
           
          </div>
          
          {
            session?.user ? 
            <Button onClick={()=>signOut()} variant={"destructive"} className="hover:bg-red-400">
              <GithubIcon size={20} />
              <p>Logout</p>
            </Button> :
            <Button onClick={()=>signIn("github")} variant={"default"}>Login</Button>
            
          }
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
