import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  addon?: React.ReactNode;
}

function Input({ className, type, addon, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:border-white dark:border-opacity-50 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-muted-foreground",
          "focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:ring-[2px]",
          "aria-invalid:ring-red-500 dark:aria-invalid:ring-red-500 aria-invalid:border-red-500 ",
          "aria-invalid:focus-visible:border-red-500 aria-invalid:focus-visible:ring-red-500",
          addon && "pr-10",
          className
        )}
        {...props}
      />
      {addon && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          {addon}
        </div>
      )}
    </div>
  )
}

export { Input }
