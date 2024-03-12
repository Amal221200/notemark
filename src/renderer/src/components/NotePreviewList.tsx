/* eslint-disable prettier/prettier */
import useNotesList from "@renderer/hooks/useNotesList";
import { cn } from "@renderer/utils";
import { ComponentProps } from "react";
import NotePreview from "./NotePreview";
import { isEmpty } from "lodash";

export type NotePreviewListProps = ComponentProps<'ul'> & {
    onSelect?: () => void
}
const NotePreviewList = ({ className, onSelect, ...props }: NotePreviewListProps) => {
    const { notes, selectedtNoteIndex, handleNoteSelect } = useNotesList({ onSelect });

    if (!notes) return
    
    if (isEmpty(notes)) {

        return (
            <ul className={cn("text-center pt-4", className)} {...props}>
                <span>No Notes Yet!</span>
            </ul>
        )
    }
    return <ul className={cn("", className)} {...props}>
        {
            notes.map((note, ind) => (
                <NotePreview key={ind}
                    onClick={() => handleNoteSelect(ind)}
                    isActive={ind === selectedtNoteIndex}    {...note} />
            ))
        }
    </ul>;
};

export default NotePreviewList;
