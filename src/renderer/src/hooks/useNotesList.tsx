/* eslint-disable prettier/prettier */
import { notesAtom, selectedNoteIndexAtom } from "@renderer/store";
import { useAtom, useAtomValue } from "jotai";

export default function useNotesList({ onSelect }: { onSelect?: () => void }) {
    const notes = useAtomValue(notesAtom);

    const [selectedtNoteIndex, setSelectedtNoteIndex] = useAtom(selectedNoteIndexAtom);

    const handleNoteSelect = async (index: number) => {
        setSelectedtNoteIndex(index)
        if (onSelect) {
            onSelect()
        }
    }

    return { notes, handleNoteSelect, selectedtNoteIndex }
}
