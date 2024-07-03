import { Button } from '@/components/ui/button';
import { UserButton } from "@clerk/nextjs";

import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-end w-full gap-2 items-center">
      <div className="flex gap-2 items-center border rounded-md p-1">
        <Search className="h-4 w-4 " />
        <input type="text" placeholder="Search" />
      </div>
      <div>
        <UserButton showName />
      </div>
      <Button
        className="gap-2 flex text-sm
        h-8 hover:bg-blue-700 bg-blue-600
        "
      >
        {" "}
        <Send className="h-4 w-4" /> Invite
      </Button>
    </div>
  );
}

export default Header