/* eslint-disable prettier/prettier */
import { cn } from '@renderer/utils'
import { ComponentProps, forwardRef } from 'react'

const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, children, ...props }, ref) => {
    return (
        <div ref={ref} className={cn('flex-1 overflow-auto', className)} {...props}>
            {children}
        </div>
    )
})

Content.displayName = 'Content'

export default Content
