import { ReactNode } from 'react';

export interface Tab {
  label: string;

  value: string;
  content: ReactNode;
}

export interface TabSwitchProps {
  tabs: Tab[];
  onTabChange?: (tabValue: string) => void;
  activeTab: string;
  onSaveClick?: () => void;
  isSubmitting?: boolean;
}
