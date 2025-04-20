import React, { ReactNode, CSSProperties, useContext } from "react";

/**
 * Props for Card sections (Header, Body, Footer)
 * - `children`: Nội dung bên trong section
 * - `variant`: Kiểu màu nền và chữ (primary, dark-primary, default)
 * - `className`: Custom class cho phần này
 * - `style`: Custom inline style
 */
interface CardSectionProps {
  children?: ReactNode;
  variant?: "primary" | "dark-primary" | "default";
  className?: string;
  style?: CSSProperties;
}

/**
 * Props for Card component
 * - `children`: Chứa các phần Header, Body, Footer
 * - `variant`: Kiểu màu nền và chữ mặc định cho Header & Footer (primary, dark-primary, default)
 * - `size`: Kích thước của Card (sm, md, lg, full)
 * - `className`: Custom class cho toàn bộ Card
 * - `style`: Custom inline style
 */
interface CardProps {
  children?: ReactNode;
  variant?: "primary" | "dark-primary" | "default";
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
  style?: CSSProperties;
}

/**
 * Xác định className dựa vào variant được truyền vào
 */
const getVariantClass = (variant?: "primary" | "dark-primary" | "default") => {
  switch (variant) {
    case "primary":
      return "bg-[#FF7506] text-white";
    case "dark-primary":
      return "bg-[#CC5C00] text-white";
    default:
      return "bg-[#F0F3F6] text-black";
  }
};

/**
 * Xác định width dựa vào size được truyền vào
 */
const getSizeClass = (size?: "sm" | "md" | "lg" | "full") => {
  switch (size) {
    case "sm":
      return "max-w-[400px]";
    case "md":
      return "max-w-[500px]";
    case "lg":
      return "max-w-[750px]";
    case "full":
      return "w-full";
    default:
      return "max-w-sm";
  }
};

const CardVariantContext = React.createContext<"primary" | "dark-primary" | "default">("primary");

const Card: React.FC<CardProps> & {
  Header: React.FC<CardSectionProps>;
  Body: React.FC<CardSectionProps>;
  Footer: React.FC<CardSectionProps>;
} = ({ children, variant = "primary", size = "md", className = "", style }) => {
  return (
    <CardVariantContext.Provider value={variant}>
      <div className={`${className} rounded-[16px] border border-gray-300 overflow-hidden shadow-md ${getSizeClass(size)}`} style={style}>
        {children}
      </div>
    </CardVariantContext.Provider>
  );
};

const CardHeader: React.FC<CardSectionProps> = ({ children, variant, className = "", style }) => {
  const parentVariant = useContext(CardVariantContext);
  return (
    <div className={`${className} ${getVariantClass(variant || parentVariant)} p-4`} style={style}>
      {children}
    </div>
  );
};

const CardBody: React.FC<CardSectionProps> = ({ children, className = "", style }) => (
  <div className={`p-4 bg-white text-black ${className}`} style={style}>{children}</div>
);

const CardFooter: React.FC<CardSectionProps> = ({ children, variant, className = "", style }) => {
  const parentVariant = useContext(CardVariantContext);
  return (
    <div className={`${className} ${getVariantClass(variant || parentVariant)} p-4`} style={style}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
