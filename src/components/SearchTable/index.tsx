import React from 'react';
import searchIcon from '../../assets/icons/fi_search.png';

import { SearchInputProps } from './type';

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = 'Tìm kiếm', value, onChange }) => {
  const handleChange = onChange.bind(this);
  return (
    <div className="relative flex items-center w-full max-w-xs sm:w-[438px] rounded-[30px] border border-gray-300">
      <img src={searchIcon} alt="Search" className="absolute left-3 w-6 h-6" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full h-[40px] pl-12 pr-4 rounded-[30px] border-none focus:outline-none focus:ring-0 italic"
      />
    </div>
  );
};

export default SearchInput;
