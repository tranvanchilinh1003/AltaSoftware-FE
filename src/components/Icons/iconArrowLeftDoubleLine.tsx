import React from 'react';

interface IconArrowLeftDoubleLineProps {
  className?: string;
}

const IconArrowLeftDoubleLine: React.FC<IconArrowLeftDoubleLineProps> = ({
  className, ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
      className={`hidden group-hover:block group-data-[focus-visible=true]:block data-[before=true]:rotate-180${className}`}
    >
      <path
        fill="currentColor"
        d="m4.836 12l6.207 6.207l1.414-1.414L7.664 12l4.793-4.793l-1.414-1.414zm5.65 0l6.207 6.207l1.414-1.414L13.314 12l4.793-4.793l-1.414-1.414z"
      ></path>
    </svg>
  );
};

export default IconArrowLeftDoubleLine;
