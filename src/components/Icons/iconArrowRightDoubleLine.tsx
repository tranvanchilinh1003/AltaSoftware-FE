import React from 'react';

interface IconArrowUpDownProps {
  className?: string;
}

const IconArrowRightDoubleLine: React.FC<
  IconArrowUpDownProps
> = ({ className, ...props }) => {
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
        d="m19.164 12l-6.207-6.207l-1.414 1.414L16.336 12l-4.793 4.793l1.414 1.414zm-5.65 0L7.307 5.793L5.893 7.207L10.686 12l-4.793 4.793l1.414 1.414z"
      ></path>
    </svg>
  );
};

export default IconArrowRightDoubleLine;
