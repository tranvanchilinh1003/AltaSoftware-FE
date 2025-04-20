export interface TableColumn {
    key: string;
    label: string;
    isDate?: boolean;
    isButton?: boolean;
    buttonText?: string;
    buttonAction?: (item: any) => void;
    isIcon?: boolean;
    renderIcon?: (item: any) => JSX.Element;
    render?: (item: any) => JSX.Element; 
}
