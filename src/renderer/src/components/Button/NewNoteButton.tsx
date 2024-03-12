/* eslint-disable prettier/prettier */
import { LuFileSignature } from "react-icons/lu";
import ActionButton, { ActionButtonProps } from "./ActionButton";
import { useSetAtom } from "jotai";
import { createEmptyNoteAtom } from "@renderer/store";
import { useCallback } from "react";

const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreateNote = useCallback(async () => {
    await createEmptyNote()
  }, [])
  return (
    <ActionButton onClick={handleCreateNote} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};

export default NewNoteButton;
