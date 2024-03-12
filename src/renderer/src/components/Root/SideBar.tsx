/* eslint-disable prettier/prettier */

import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'

const SideBar = ({ className, children, ...props }: ComponentProps<'aside'>) => {

    return (
        <aside className={cn('w-[250px] h-[calc(100vh+10px)] overflow-auto', className)} {...props}>
            {children}
        </aside>
    )
}

export default SideBar