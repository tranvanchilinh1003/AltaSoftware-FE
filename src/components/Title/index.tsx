import React from "react";
import { TitleProps } from "./type";
import TextComponent from "../Text";
import "./style.css";

const TitleComponent: React.FC<TitleProps> = ({
  text,
  size,
  font,
  color,
  className,
  align,
  weight = "bold",
  style,
}) => {
  return (
    <div className={`title-container ${className || ""}`} style={style}>
      <TextComponent
        text={text}
        font={font ?? "var(--font-Mulish)"}
        size={size ?? 20}
        color={color}
        weight={weight }
        align={align}
      />
    </div>
  );
};

export default TitleComponent;
