import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image'
import { Session } from 'next-auth'

const Avatar = ({session} : {session : Session | null}) => {
  return (
    <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger >
                <Image
                  src={
                    session?.user?.image ||
                    "https://imgs.search.brave.com/01loLPoF2OPdOFYcM13q8ZPoKICaegqhr0FF34a1HEY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVByb2ZpbGUt/UE5HLUltYWdlcy5w/bmc"
                  }
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full border border-neutral-400 shadow-lg"
                />
              </TooltipTrigger>
              <TooltipContent >
                <p>{session?.user?.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
  )
}

export default Avatar