/* eslint-disable prettier/prettier */

import { cn } from "@renderer/utils"
import { ComponentProps } from "react"

const DraggableTopBar = ({ className, children, ...props }: ComponentProps<'header'>) => {
    return <header className={cn("fixed top-0 right-0 h-8 w-[calc(100vw-250px)] bg-slate-950", className)} {...props} >
        {children}
    </header>
}

export default DraggableTopBar
