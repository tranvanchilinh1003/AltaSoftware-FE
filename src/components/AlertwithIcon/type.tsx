// type.tsx
export interface AlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  icon: React.ReactNode;
}
