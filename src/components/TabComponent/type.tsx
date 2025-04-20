import { ReactNode } from "react";

export interface TabsProps {
    children: ReactNode;
    ariaLabel?: string;
    radius?: "sm" | "md" | "lg" | "xl";
    variant?: "solid" | "underlined" | "bordered" | "light"| "charcoal";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" |"white";
    size?: "sm" | "md" | "lg" | "xl";
    className?: string; // ✅ Thêm className
    background?: string; // ✅ Thêm background tùy chỉnh
}

export interface TabProps {
    tabKey: string | number;
    title: string;
    icon?: ReactNode;
    tag?: string | number;
    children: ReactNode;
    path?: string;
    radius?: "sm" | "md" | "lg" | "xl";
    variant?: "solid" | "underlined" | "bordered" | "light"|"charcoal";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" |"white";
    size?: "sm" | "md" | "lg" | "xl";
    className?: string; // ✅ Thêm className
    background?: string; // ✅ Thêm background tùy chỉnh
    onClick?: () => void;
}
