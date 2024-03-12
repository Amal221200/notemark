import { useRef } from "react";
import ActionButtonsRow from "./components/ActionButtonsRow";
import DraggableTopBar from "./components/DraggableTopBar";
import FloatingNoteTitle from "./components/FloatingNoteTitle";
import MarkDownEditor from "./components/MarkDownEditor";
import NotePreviewList from "./components/NotePreviewList";
import Content from "./components/Root/Content";
import SideBar from "./components/Root/SideBar";
import RootLayout from "./layout/RootLayout";

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo({ top: 0 });
  };
  return (
    <RootLayout>
      <SideBar className="p-2">
        <ActionButtonsRow className="flex justify-between" />
        <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
      </SideBar>
      <Content
        ref={contentContainerRef}
        className="relative border-l border-l-white/20 bg-slate-950"
      >
        <DraggableTopBar>
          <FloatingNoteTitle className="pt-2" />
        </DraggableTopBar>
        <div className="mt-8">
          <MarkDownEditor />
        </div>
      </Content>
    </RootLayout>
  );
};

export default App;
