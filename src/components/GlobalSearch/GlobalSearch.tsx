import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input/input";

interface GlobalSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const GlobalSearch = ({ 
  value, 
  onChange, 
  placeholder = "Search patients..." 
}: GlobalSearchProps) => {
  const containerStyle = {
    position: "relative" as const,
    flex: "1",
  };

  const iconStyle = {
    position: "absolute" as const,
    left: "var(--space-sm)",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--muted-foreground)",
  };

  const inputStyle = {
    paddingLeft: "2.25rem",
    width: "100%",
    backgroundColor: "var(--background)",
    borderColor: "var(--border)",
    color: "var(--foreground)",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={containerStyle}>
      <Search size={16} style={iconStyle} />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>
  );
};

export default GlobalSearch;