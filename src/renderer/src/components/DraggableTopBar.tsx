/* eslint-disable prettier/prettier */

import { cn } from "@renderer/utils"
import { ComponentProps } from "react"

const DraggableTopBar = ({ className, children, ...props }: ComponentProps<'header'>) => {
    return <header className={cn("absolute inset-0 h-8 bg-transparent", className)} {...props} >
        {children}
    </header>
}

export default DraggableTopBar
