"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from "../_components/Editor";

import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";
import axiosInstance from "@/lib/axios.instance";

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);

  const [fileData, setFileData] = useState<FILE | any>();
  useEffect(() => {
    console.log("FILEID", params.fileId);
    params.fileId && getFileData();
  }, []);

  const getFileData = async () => {
    await axiosInstance
      .get(`/files/${params.fileId}`)
      .then((resp) => {
        console.log("FILEDATA", resp.data);
        setFileData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [selectLayout, setSelectLayout] = useState("both");

  return (
    <div>
      <WorkspaceHeader
        onSave={() => setTriggerSave(!triggerSave)}
        fileData={fileData}
      />

      {/* Workspace Layout  */}
      <div className="flex flex-col w-screen  h-screen">
        <div className="flex  items-center justify-center gap-2 h-20 w-screen border-b-2 py-2">
          <div className="flex border-2 border-slate-200  ">
            <div
              className={`py-1 px-2  text-sm cursor-pointer ${
                selectLayout === "document" ? "bg-slate-200" : ""
              }`}
              onClick={() => setSelectLayout("document")}
            >
              Document
            </div>
            <div
              className={`py-1 px-2  text-sm border-l border-r cursor-pointer ${
                selectLayout === "both" ? "bg-slate-200" : ""
              }`}
              onClick={() => setSelectLayout("both")}
            >
              Both
            </div>
            <div
              className={`py-1 px-2 text-sm cursor-pointer ${
                selectLayout === "canvas" ? "bg-slate-200" : ""
              }`}
              onClick={() => setSelectLayout("canvas")}
            >
              Canvas
            </div>
          </div>
        </div>

        {/* Document  */}
        {selectLayout === "document" ? (
          <div className=" h-screen w-screen">
            <Editor
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
          </div>
        ) : null}
        {/* Whiteboard/canvas  */}

        {selectLayout === "canvas" ? (
          <div className=" h-screen w-screen">
            <Canvas
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
          </div>
        ) : null}

        {selectLayout === "both" ? (
          <div className={` ${"grid grid-cols-1 md:grid-cols-2"}`}>
            <div className=" h-screen">
              <Editor
                onSaveTrigger={triggerSave}
                fileId={params.fileId}
                fileData={fileData}
              />
            </div>
            <div className=" h-screen border-l">
              <Canvas
                onSaveTrigger={triggerSave}
                fileId={params.fileId}
                fileData={fileData}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Workspace