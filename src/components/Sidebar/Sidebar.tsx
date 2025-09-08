import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs/tabs";
import { Text } from "@/components/ui/Typography/Text";

export interface SidebarOption {
  value: string;
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

interface SidebarProps {
  options: SidebarOption[];
  defaultValue?: string;
  isHorizontal?: boolean;
}

const Sidebar = ({ options, defaultValue, isHorizontal = false }: SidebarProps) => {
  const firstOption = options[0]?.value || "";
  const activeValue = defaultValue || firstOption;

  if (isHorizontal) {
    return (
      <div className="flex flex-col h-full w-full" style={{backgroundColor: 'var(--background)'}}>
        <Tabs defaultValue={activeValue} orientation="horizontal" className="flex flex-col h-full w-full">
          <TabsList className="flex flex-row w-full" style={{backgroundColor: 'var(--card)', padding: 'var(--space-xs)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-lg)', border: 'var(--border-thin) solid var(--border)'}}>
            {options.map((option) => (
              <TabsTrigger 
                key={option.value}
                value={option.value} 
                className="flex-1 justify-center bg-blue-600 data-[state=active]:bg-blue-400 data-[state=active]:text-white hover:bg-blue-500 hover:text-white text-white" 
                style={{
                  height: 'var(--space-xl)', 
                  color: 'var(--primary-foreground)',
                  borderRadius: 'var(--radius-md)',
                  margin: '0 var(--space-2xs)'
                }}
              >
                {option.icon}
                <Text type="span" className="hidden sm:inline" style={{marginLeft: 'var(--space-xs)'}}>{option.label}</Text>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="flex-1 overflow-hidden">
            {options.map((option) => (
              <TabsContent key={option.value} value={option.value} className="mt-0 h-full">
                <div className="h-full overflow-auto">
                  {option.content}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    );
  }

  return (
    <Tabs defaultValue={activeValue} orientation="vertical" className="flex flex-row h-full w-full" style={{backgroundColor: 'var(--background)', border: 'var(--border-medium) solid var(--sidebar-border)', borderRadius: 'var(--radius-lg)'}}>
      <TabsList className="flex flex-col h-50" style={{width: 'var(--sidebar-width)', backgroundColor: 'var(--card)', padding: 'var(--space-xs)', borderTopLeftRadius: 'var(--radius-lg)', borderBottomLeftRadius: 'var(--radius-lg)', borderTopRightRadius: '0', borderBottomRightRadius: '0'}}>
        {options.map((option, index) => (
          <TabsTrigger 
            key={option.value}
            value={option.value} 
            className="w-full justify-start bg-blue-600 data-[state=active]:bg-blue-400 data-[state=active]:text-white hover:bg-blue-500 hover:text-white text-white"
            style={{
              height: 'var(--space-xl)',
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius-md)',
              marginBottom: index < options.length - 1 ? 'var(--space-xs)' : '0'
            }}
          >
            {option.icon}
            <Text type="span">{option.label}</Text>
          </TabsTrigger>
        ))}
      </TabsList>
      
      <div className="flex-1 overflow-hidden" style={{padding: 'var(--space-lg)', borderLeft: 'var(--border-thick) solid var(--border)', borderTopRightRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)'}}>
        {options.map((option) => (
          <TabsContent key={option.value} value={option.value} className="mt-0 h-full">
            <div className="h-full overflow-auto">
              {option.content}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default Sidebar;