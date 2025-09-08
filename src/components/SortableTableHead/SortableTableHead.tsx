import { TableHead } from "@/components/ui/Table/table";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface SortableTableHeadProps<T extends string> {
  field: T;
  children: React.ReactNode;
  onSort: (field: T) => void;
  sortField: T | null;
  sortDirection: 'asc' | 'desc' | null;
  className?: string;
  style?: React.CSSProperties;
}

const SortableTableHead = <T extends string>({
  field,
  children,
  onSort,
  sortField,
  sortDirection,
  className = "",
  style = {}
}: SortableTableHeadProps<T>) => {
  const handleClick = () => {
    onSort(field);
  };


  const getSortIcon = () => {
    if (sortField !== field) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="h-4 w-4" />;
    }
    if (sortDirection === 'desc') {
      return <ChevronDown className="h-4 w-4" />;
    }
    return <ChevronsUpDown className="h-4 w-4" />;
  };

  const mergedStyle = {
    position: 'relative' as const,
    borderColor: 'var(--border)',
    color: 'var(--foreground)',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    ...style
  };

  return (
    <TableHead 
      className={`cursor-pointer select-none hover:bg-muted/50 hover:z-10 transition-all duration-200 relative ${className}`}
      style={mergedStyle}
      onClick={handleClick}
    >
      <div className="flex items-center justify-start h-full transition-all duration-200" style={{
        gap: 'var(--space-xs)',
        paddingLeft: 'var(--space-sm)',
        paddingRight: 'var(--space-sm)',
        paddingTop: 'var(--space-xs)',
        paddingBottom: 'var(--space-xs)'
      }}>
        {children}
        {getSortIcon()}
      </div>
    </TableHead>
  );
};

export default SortableTableHead;