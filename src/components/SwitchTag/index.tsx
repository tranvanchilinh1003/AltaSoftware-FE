import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { SwitchTagProps } from "./type";

const SwitchTag: React.FC<SwitchTagProps> = ({ options, className = '' }) => {
  const { labels, paths } = options; // paths chứa đường dẫn cho từng tab
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`switch-tab `}>
      {labels.map((label, index) => {
        const isActive = location.pathname === paths[index]; // So sánh đường dẫn hiện tại
        return (
          <button
            key={index}
            className={`tab-button ${isActive ? "tab-button active" : "tab-button"
              } ${className}`}
            onClick={() => navigate(paths[index])} // Chuyển hướng khi click
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default SwitchTag;
