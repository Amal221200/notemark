/* eslint-disable prettier/prettier */
import { MDXEditorMethods } from "@mdxeditor/editor";
import { savedNoteAtom, selectedNoteAtom } from "@renderer/store";
import { AUTO_SAVING } from "@shared/constants";
import { NoteContent } from "@shared/models";
import { useAtomValue, useSetAtom } from "jotai";
import { throttle } from "lodash";
import { useRef } from "react";

export default function useMarkdownEditor() {
    const selectedNote = useAtomValue(selectedNoteAtom);
    const savedNote = useSetAtom(savedNoteAtom)
    const editorRef = useRef<MDXEditorMethods>(null);

    const handleAutoSave = throttle(async (content: NoteContent) => {
        if (!selectedNote) return

        await savedNote(content);
    }, AUTO_SAVING, {
        leading: false,
        trailing: true
    })


    const handleBlur = async () => {
        if (!selectedNote) return
        handleAutoSave.cancel();
        const content = editorRef.current?.getMarkdown()
        if (content === undefined)
            return
        await savedNote(content);
    }

    return {
        selectedNote,
        editorRef,
        handleAutoSave,
        handleBlur
    }
}
