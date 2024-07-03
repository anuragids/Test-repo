import {
  ChevronDown,
  FolderPlus,
  LayoutGrid,
  LogOut,
  Settings,
  TerminalSquare,
  Users,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";

import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import axiosInstance from "@/lib/axios.instance";

export interface TEAM {
  createdBy: String;
  teamName: String;
  _id: String;
}
function SideNavTopSection({ user, setActiveTeamInfo }: any) {
  const { signOut } = useClerk();

  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  const router = useRouter();

  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [teamList, setTeamList] = useState<TEAM[]>();
  useEffect(() => {
    user && getTeamList();
    console.log(user);
  }, [user]);

  useEffect(() => {
    activeTeam ? setActiveTeamInfo(activeTeam) : null;
  }, [activeTeam]);

  //api call to get team list
  const getTeamList = async () => {
    const response = await axiosInstance.get(
      "/users/" + user?.emailAddresses[0].emailAddress
    );
    console.log("TeamList", response.data.teams);
    setTeamList(response.data.teams);
  };

  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div
            className="flex items-center gap-3
      hover:bg-slate-200 p-3 rounded-lg
      cursor-pointer
      "
          >
            <Image src="/logo-1.png" alt="logo" width={40} height={40} />
            <h2
              className="flex gap-2 
                    items-center
      font-bold text-[17px]
      "
            >
              {activeTeam?.teamName ? activeTeam?.teamName : "Select Team"}
              <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-4">
          {/* Team Section  */}
          <div>
            {teamList?.map((team, index) => (
              <h2
                key={index}
                className={`p-2 hover:bg-blue-500
                         hover:text-white
                         rounded-lg mb-1 cursor-pointer
                         ${
                           activeTeam?._id == team._id &&
                           "bg-blue-500 text-white"
                         }`}
                onClick={() => setActiveTeam(team)}
              >
                {team.teamName}
              </h2>
            ))}
          </div>
          <Separator className="mt-2 bg-slate-100" />
          {/* Option Section  */}
          <div>
            {menu.map((item, index) => (
              <h2
                key={index}
                className="flex gap-2 items-center
                        p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                onClick={() => onMenuClick(item)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
            <Button
              variant="outline"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              <h2
                className="flex gap-2 items-center
                        p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </h2>
            </Button>
          </div>
          <Separator className="mt-2 bg-slate-100" />
          {/* User Info Section  */}
          {user && (
            <div className="mt-2 flex gap-2 items-center">
              <Image
                src={user?.imageUrl}
                alt="user"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div>
                <h2 className="text-[14px] font-bold">{user?.username}</h2>
                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* All File Button  */}
      <Button
        variant="outline"
        className="w-full justify-start
          gap-2 font-bold mt-8 bg-gray-100"
        onClick={() => router.push("/dashboard")}
      >
        <LayoutGrid className="h-5 w-5" />
        All Files
      </Button>
      {/* <div
        className="w-full  bg-slate-100 py-4 rounded-lg flex gap-2 px-4 justify-between items-center mt-2 cursor-pointer uppercase font-semibold"
        onClick={() => router.push("/teams/create")}
      >
        <h2>Teams Folder</h2>
        <FolderPlus className="h-5 w-5" /> */}
      {/* </div> */}
    </div>
  );
}

export default SideNavTopSection;
