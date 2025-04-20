import React from "react";

interface IconProps {
    className?: string;
}

const IconChevronBigRightOrange: React.FC<IconProps> = ({ className }) => {
    return (
        <svg
            className={`w-4 h-4 lg:w-5 lg:h-5 ${className || ""}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.58059 19.9549C8.06875 20.4431 8.8602 20.4431 9.34836 19.9549L16.4194 12.8839C16.9076 12.3957 16.9076 11.6043 16.4194 11.1161L9.34836 4.04504C8.86021 3.55688 8.06875 3.55689 7.58059 4.04504C7.09244 4.5332 7.09244 5.32466 7.58059 5.81281L13.2374 11.4697C13.5303 11.7626 13.5303 12.2374 13.2374 12.5303L7.58059 18.1872C7.09244 18.6753 7.09244 19.4668 7.58059 19.9549Z"
                fill="#FF7506"
            />
        </svg>
    );
};

export default IconChevronBigRightOrange;
