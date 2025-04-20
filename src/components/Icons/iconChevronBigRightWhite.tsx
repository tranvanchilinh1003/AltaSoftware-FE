import React from "react";

interface IconProps {
    className?: string;
}

const IconChevronBigRightWhite: React.FC<IconProps> = ({ className }) => {
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
                d="M4.04506 7.58058C3.5569 8.06874 3.5569 8.8602 4.04506 9.34835L11.1161 16.4194C11.6043 16.9076 12.3957 16.9076 12.8839 16.4194L19.955 9.34836C20.4431 8.8602 20.4431 8.06874 19.955 7.58059C19.4668 7.09243 18.6753 7.09243 18.1872 7.58059L12.5303 13.2374C12.2374 13.5303 11.7626 13.5303 11.4697 13.2374L5.81282 7.58059C5.32467 7.09243 4.53321 7.09243 4.04506 7.58058Z"
                fill="white"
            />
        </svg>
    );
};

export default IconChevronBigRightWhite;
