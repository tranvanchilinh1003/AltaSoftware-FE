export interface TableColumn {
    key: string;
    label: string;
    isDate?: boolean;
    isButton?: boolean;
    buttonText?: string;
    buttonAction?: (item: any) => void;
  }