import React from 'react';

interface IconOutlineArrowRightSingleProps {
    className?: string;
}

const IconOutlineArrowRightSingle: React.FC<
    IconOutlineArrowRightSingleProps
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
                d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
            ></path>
        </svg>
    );
};

export default IconOutlineArrowRightSingle;
