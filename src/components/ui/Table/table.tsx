import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-lg"
      style={{
        backgroundColor: 'var(--card)',
        padding: 'var(--space-xs)',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm border-separate", className)}
        style={{ 
          borderSpacing: 'var(--space-sm) var(--space-sm)', 
          tableLayout: 'fixed',
          color: 'var(--foreground)'
        }}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "font-medium [&>tr]:last:border-b-0",
        className
      )}
      style={{
        backgroundColor: 'var(--muted)',
        borderTopColor: 'var(--border)',
        borderTopWidth: '1px',
        color: 'var(--foreground)'
      }}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "transition-colors rounded-lg shadow-sm cursor-pointer",
        className
      )}
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--neutral-200)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--accent)';
        e.currentTarget.style.borderColor = 'var(--neutral-300)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--card)';
        e.currentTarget.style.borderColor = 'var(--neutral-200)';
      }}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-left align-middle font-normal text-sm whitespace-nowrap first:rounded-l-lg last:rounded-r-lg border-l-0 border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      style={{
        color: 'var(--foreground)',
        height: 'var(--space-3xl)',
        fontWeight: '600',
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '2px solid var(--border)',
        padding: '0'
      }}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "align-middle text-sm whitespace-nowrap first:rounded-l-lg last:rounded-r-lg border-l-0 border-r-0 cursor-pointer [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      style={{
        paddingLeft: 'var(--space-md)',
        paddingRight: 'var(--space-md)',
        paddingTop: 'var(--space-md)',
        paddingBottom: 'var(--space-md)',
        color: 'var(--foreground)'
      }}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-sm", className)}
      style={{
        color: 'var(--muted-foreground)',
        marginTop: 'var(--space-md)'
      }}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
