import { Archive, ChevronDown, Flag, Github } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from "./SideNavTopSection";

import SideNavBottomSection from "./SideNavBottomSection";

import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useClerk } from "@clerk/nextjs";
import axiosInstance from "@/lib/axios.instance";

function SideNav() {
  const [activeTeam, setActiveTeam] = useState<any>();
  const { user }: any = useClerk();

  const [totalFiles, setTotalFiles] = useState<number>(0);
  const { fileList_, setFileList_ } = useContext(FileListContext);
  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam, totalFiles]);

  const onFileCreate = async (fileName: string) => {
    try {
      const response = await axiosInstance.post("/files", {
        fileName: fileName,
        teamId: activeTeam?._id,
        createdBy: "668369af10a00d709d2400da",
        archived: false,
      });
      console.log("file created", response.data);
      setTotalFiles(totalFiles + 1);
      toast.success("File created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const getFiles = async () => {
    try {
      const response = await axiosInstance(`/files/team/${activeTeam?._id}`);
      console.log("files reponse", response.data);
      setFileList_(response.data);
      setTotalFiles(response.data?.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className=" h-screen 
    fixed w-72 borde-r border-[1px] p-6
    flex flex-col
    "
    >
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: any) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
}

export default SideNav