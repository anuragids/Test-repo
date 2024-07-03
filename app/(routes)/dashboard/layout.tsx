"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useClerk } from "@clerk/nextjs";
import axiosInstance from "@/lib/axios.instance";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const {user}:any=useKindeBrowserClient();
  const { user }: any = useClerk();
  const [fileList_, setFileList_] = useState();
  const router = useRouter();

  useEffect(() => {
    user;
  }, [user]);

  const checkTeam = async () => {
    const result = await axiosInstance(
      `/teams ${user.emailAddresses[0].emailAddress}}`
    );
    if (!result.data) {
      redirect("/");
    }
    
  };

  return (
    <div>
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="grid grid-cols-4">
          <div className="bg-white h-screen w-72 fixed">
            <SideNav />
          </div>
          <div className="col-span-4 ml-72">{children}</div>
        </div>
      </FileListContext.Provider>
    </div>
  );
}

export default DashboardLayout;
