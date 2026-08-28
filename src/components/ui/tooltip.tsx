"use client"

import * as React from 'react'

type TooltipContextValue = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

function useTooltipContext() {
  const context = React.useContext(TooltipContext)

  if (!context) {
    throw new Error('Tooltip components must be used within <Tooltip>.')
  }

  return context
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex items-center justify-center">{children}</div>
    </TooltipContext.Provider>
  )
}

export function TooltipTrigger({ children }: { children: React.ReactElement }) {
  const { setOpen } = useTooltipContext()
  const child = React.Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement>
  >
  const { onMouseEnter, onMouseLeave, onFocus, onBlur } = child.props

  return React.cloneElement(child, {
    onMouseEnter: (event) => {
      onMouseEnter?.(event)
      setOpen(true)
    },
    onMouseLeave: (event) => {
      onMouseLeave?.(event)
      setOpen(false)
    },
    onFocus: (event) => {
      onFocus?.(event)
      setOpen(true)
    },
    onBlur: (event) => {
      onBlur?.(event)
      setOpen(false)
    },
  })
}

export function TooltipContent({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open } = useTooltipContext()

  if (!open) {
    return null
  }

  return (
    <div role="tooltip" className={className}>
      {children}
    </div>
  )
}
