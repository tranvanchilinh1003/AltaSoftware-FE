export type Tab = {
    label: string;
    value: string;
    content: React.ReactNode;
  };
  
  export interface SwitchTabCustomProps {
    className?: string;
    tabs: Tab[];
    activeTab: string;
    onTabChange?: (value: string) => void;
  }
  