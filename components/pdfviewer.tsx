import React, { ReactElement } from "react";
import { SpecialZoomLevel, Worker, Viewer } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { CloseIcon } from "@/components/icons";

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
    renderToolbar: (Toolbar: (props: ToolbarProps) => ReactElement) => (
      <Toolbar>
        {(slots: ToolbarSlot) => {
          const {
            CurrentPageInput,
            EnterFullScreen,
            GoToNextPage,
            GoToPreviousPage,
            NumberOfPages,
            ShowSearchPopover,
          } = slots;
          return (
            <div
              style={{
                alignItems: "center",
                display: "flex",
                width: "100%",
              }}
            >
              <div style={{ padding: "0px 2px" }}>
                <ShowSearchPopover />
              </div>
              <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                <GoToPreviousPage />
              </div>
              <div className="flex items-center" style={{ padding: "0px 2px" }}>
                <CurrentPageInput /> / <NumberOfPages />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <GoToNextPage />
              </div>
              <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                <EnterFullScreen />
              </div>
            </div>
          );
        }}
      </Toolbar>
    ),
    toolbarPlugin: {
      fullScreenPlugin: {
        onEnterFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        },
        onExitFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        },
        renderExitFullScreenButton: (props) => (
          <div
            style={{
              position: "fixed",
              top: "23px",
              right: "40px",
              zIndex: 1,
            }}
          >
            <button onClick={props.onClick}>
              <CloseIcon />
            </button>
          </div>
        ),
      },
    },
  });

  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
    >
      <div style={{ height: "800px" }}>
        <Viewer
          defaultScale={SpecialZoomLevel.PageFit}
          fileUrl={pdfUrl}
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default PdfViewer;
