import { SVGProps } from "react";

export function IconChevronUp(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            width="1em"
            height="1em"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.15 7.85a.5.5 0 0 0 .707 0l3.15-3.15l3.15 3.15a.5.5 0 0 0 .707-.707l-3.5-3.5a.5.5 0 0 0-.707 0l-3.5 3.5a.5.5 0 0 0 0 .707z"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}
