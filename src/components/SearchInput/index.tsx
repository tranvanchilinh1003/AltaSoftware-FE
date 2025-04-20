import React, { useState } from "react";
import { SearchInputProps } from "./type";
import icon from "./icon";

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Tìm kiếm...", onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    return (
        <div className="relative w-[430px] h-[40px]">
            <img src={icon.searchIcon} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full h-full pl-10 pr-4 rounded-full border-none bg-gray-100 focus:outline-none"
            />
        </div>
    );
};

export default SearchInput;
