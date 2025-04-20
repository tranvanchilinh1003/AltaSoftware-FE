import React, { useRef } from 'react';
import { StudentRetentionListFromSearchProps } from './type';
import { IconSearchLightGrayishBlue } from '../../../../../components/Icons';
const StudentRetentionListFromSearch: React.FC<
StudentRetentionListFromSearchProps
> = ({
    placeholder = 'Tìm kiếm',
    onSearch,
    inputClassName = '',
    inputStyle = {},
}) => {
        const inputRef = useRef<HTMLInputElement>(null);

        const handleSearch = () => {
            if (inputRef.current) {
                onSearch?.(inputRef.current.value);
            }
        };

        return (
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}  >
                <div className="relative">
                    <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                        <IconSearchLightGrayishBlue className="fill-[#F0F3F6] dark:fill-[#F0F3F6]" />
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={placeholder}
                        className={`
                        dark:bg-dark-900 bg-[#F0F3F6]
                        rounded-full shadow-sm placeholder:text-[#373839] dark:placeholder:text-[#373839]
                        focus:border-[#F0F3F6] focus:outline-none focus:ring focus:ring-[#F0F3F6]
                        dark:border-gray-800 dark:text-white/90 dark:focus:border-[#F0F3F6]
                        h-8 sm:h-8 md:h-8 lg:h-8 xl:h-12 2xl:h-10
                        w-full sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[438px] 2xl:w-[438px]
                        py-1 sm:py-2 md:py-1 lg:py-1 pl-12 pr-14
                        text-sm sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base
                        ${inputClassName}`}
                        style={inputStyle}
                    />
                </div>
            </form>
        );
    };

export default StudentRetentionListFromSearch;
