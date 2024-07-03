import React, { useEffect, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/FileList";
import axiosInstance from "@/lib/axios.instance";
import { toast } from "sonner";

function Canvas({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: any;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  console.log("fileData", fileData);
  let elements = [];

  try {
    elements = fileData?.whiteboard ? JSON.parse(fileData.whiteboard) : [];
  } catch (error) {
    console.error("Failed to parse whiteboard data:", error);
  }

  const updateWhiteboard = async () => {
    await axiosInstance
      .patch(`/files/${fileId}`, {
        whiteboard: JSON.stringify(whiteBoardData),
      })
      .then((resp) => {
        console.log(resp);
        toast.success("Successfully updated the whiteboard");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger]);

  const saveWhiteboard = () => {
    updateWhiteboard();
  };
  return (
    <div style={{ height: "800px" }}>
      {fileData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: true,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Logo />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas