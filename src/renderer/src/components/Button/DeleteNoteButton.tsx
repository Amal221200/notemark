/* eslint-disable prettier/prettier */
import { FaRegTrashCan } from 'react-icons/fa6'
import ActionButton, { ActionButtonProps } from './ActionButton'
import { useSetAtom } from 'jotai'
import { deleteNoteAtom } from '@renderer/store'
import { useCallback } from 'react'

const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {

    const deleteNote = useSetAtom(deleteNoteAtom);

    const handleDeleteNote = useCallback(async () => {
        await deleteNote()
    }, [])

    return (
        <ActionButton onClick={handleDeleteNote} {...props}>
            <FaRegTrashCan className='w-4 h-4 text-zinc-300' />
        </ActionButton>
    )
}

export default DeleteNoteButton