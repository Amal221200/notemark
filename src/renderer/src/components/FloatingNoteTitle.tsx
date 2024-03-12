/* eslint-disable prettier/prettier */

import { selectedNoteAtom } from "@renderer/store"
import { cn } from "@renderer/utils"
import { useAtomValue } from "jotai"
import { ComponentProps } from "react"


const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
    const selectedNote = useAtomValue(selectedNoteAtom);
    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <span className="text-gray-500">{selectedNote ? selectedNote.title : 'NoteMaker'}</span>
        </div>
    )
}

export default FloatingNoteTitle