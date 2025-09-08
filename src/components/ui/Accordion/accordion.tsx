import React, { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionItemProps {
  id: string;
  header: ReactNode;
  content: ReactNode;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
  className?: string;
}

interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  header,
  content,
  isOpen = false,
  onToggle,
  className = "",
}) => {
  return (
    <div 
      className={`border border-border rounded-lg overflow-hidden ${className}`}
      style={{backgroundColor: 'var(--card)', borderColor: 'var(--border)'}}
    >
      <button
        className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
        onClick={() => onToggle?.(id)}
        style={{backgroundColor: isOpen ? 'var(--muted)' : 'transparent'}}
      >
        <div className="flex-1">
          {header}
        </div>
        <div className="ml-2 flex-shrink-0">
          {isOpen ? (
            <ChevronUp size={20} style={{color: 'var(--foreground)'}} />
          ) : (
            <ChevronDown size={20} style={{color: 'var(--foreground)'}} />
          )}
        </div>
      </button>
      {isOpen && (
        <div 
          className="p-4 border-t border-border"
          style={{borderTopColor: 'var(--border)'}}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = "",
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(id);
      }
      
      return newOpenItems;
    });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          {...item}
          isOpen={openItems.has(item.id)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};