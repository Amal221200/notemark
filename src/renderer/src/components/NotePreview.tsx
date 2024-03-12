/* eslint-disable prettier/prettier */

import { cn, formatDateFromMS } from "@renderer/utils";
import { NoteInfo } from "@shared/models";
import { ComponentProps } from "react";

export type NotePreviewProps = NoteInfo & {
    isActive?: boolean,
} & ComponentProps<'article'>

const NotePreview = ({ title, lastEditTime, isActive, className, ...props }: NotePreviewProps) => {
    return (
        <article className={cn("cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75", {
            'bg-zinc-400/75': isActive,
            'hover:bg-zinc-500/75': !isActive,
            className
        })} {...props}>
            <h3 className="mb-1 font-bold truncate">{title}</h3>
            <span className="inline-block w-full mb-2 text-xs font-light text-left">{formatDateFromMS(lastEditTime)}</span>
        </article>
    )
}

export default NotePreview;