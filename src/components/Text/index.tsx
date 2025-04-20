import React from "react";
import { TextProps } from "./type";

const TextComponent: React.FC<TextProps> = ({
    text,
    size,
    font,
    color,
    flex,
    className,
    align,
    weight,
    italic,
}) => {
    const fontSizeClass = typeof size === "number" ? `text-[${size}px]` : `text-${size}`;
    const colorClass = color ?? "text-black";
    const textAlignClass = align ?? "text-left";
    const fontWeightClass =
        weight === "thin"
            ? "font-thin"
            : weight === "semibold"
                ? "font-semibold"
                : weight === "bold"
                    ? "font-bold"
                    : weight === "extrabold"
                        ? "font-extrabold"
                        : "font-normal";
    const fontStyleClass = italic ? "italic" : "";

    const combinedClass = `
    text-component
    ${flex ? "flex-1" : ""}
    ${font === "mulish" ? "font-mulish" : ""}
    ${fontSizeClass}
    ${colorClass}
    ${textAlignClass}
    ${fontWeightClass}
    ${fontStyleClass}
    ${className || ""}
  `.trim();

    return <span className={combinedClass}>{text}</span>;
};

export default TextComponent;
