import React from 'react';

interface IconOutlineArrowLeftSingleProps {
    className?: string;
}

const IconOutlineArrowLeftSingle: React.FC<
    IconOutlineArrowLeftSingleProps
> = ({ className, ...props }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            {...props}
        >
            <path
                fill="currentColor"
                d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"
            ></path>
        </svg>
    );
};

export default IconOutlineArrowLeftSingle;
