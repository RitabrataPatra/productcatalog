import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GithubIcon, LogOutIcon } from "lucide-react";
import { Session } from "next-auth";

import React from "react";
import Avatar from "./Avatar";
import { signIn, signOut } from "next-auth/react";

const DropAuth = ({ session }: { session: Session | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar session={session} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {session?.user
            ? `${session?.user?.name}'s Account`
            : "Sign in with Github"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
        {/* <DropdownMenuItem>{session?.expires}</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {session?.user ? (
          <>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOutIcon />
              <p className="text-red-600">Log out</p>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => signIn("github")}>
            <GithubIcon />
            <p className="text-blue-600">Sign in</p>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropAuth;
