import { TableHead } from "@/components/ui/Table/table";
import { Input } from "@/components/ui/Input/input";

interface SearchableTableHeadProps<T extends string> {
  placeholder: string;
  value: string;
  field: T;
  onSearchChange: (field: T, value: string) => void;
  className?: string;
  onFocus?: (field: T) => void;
  onBlur?: () => void;
}

const SearchableTableHead = <T extends string>({ 
  placeholder, 
  value, 
  field,
  onSearchChange, 
  className = "text-sm",
  onFocus,
  onBlur
}: SearchableTableHeadProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(field, e.target.value);
  };

  const handleFocus = () => {
    onFocus?.(field);
  };

  const handleBlur = () => {
    onBlur?.();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--neutral-50)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--card)';
  };

  return (
    <TableHead 
      style={{
        backgroundColor: 'var(--card)', 
        borderColor: 'var(--border)',
        padding: 'var(--space-xs)'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 'var(--space-2xs)'
      }}>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-field={field}
          className={`${className} placeholder:text-muted-foreground`}
          style={{
            backgroundColor: 'var(--input)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
            height: 'var(--space-lg)',
            padding: 'var(--space-xs)',
            width: '100%',
            textAlign: 'center'
          }}
        />
      </div>
    </TableHead>
  );
};

export default SearchableTableHead;