import React from 'react';

interface IconCheckProps {
  className?: string;
}

const IconInfoOutline: React.FC<IconCheckProps> = ({
  className = '',
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C7.48131 4 4 7.48131 4 12C4 16.5187 7.48131 20 12 20C16.5187 20 20 16.5187 20 12C20 7.48131 16.5187 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 9.5C12.5523 9.5 13 9.94772 13 10.5V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V10.5C11 9.94772 11.4477 9.5 12 9.5ZM12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8H12.01C12.5623 8 13.01 7.55228 13.01 7C13.01 6.44772 12.5623 6 12.01 6H12Z"
        fill="#FF7506"
      />
    </svg>
  );
};

export default IconInfoOutline;
