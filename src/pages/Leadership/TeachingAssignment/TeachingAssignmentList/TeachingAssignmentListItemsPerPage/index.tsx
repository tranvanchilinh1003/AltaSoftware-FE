import React, { useState } from "react";
import TextComponent from "../../../../../components/Text";
import { ItemsPerPageProps } from "./type";

const ItemsPerPage: React.FC<ItemsPerPageProps> = ({
    value,
    onChange,
    min = 1,
    max = 10,
}) => {
    const [inputValue, setInputValue] = useState(value.toString());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        if (/^\d*$/.test(newValue)) { // Chỉ chấp nhận số
            let numericValue = parseInt(newValue, 10);

            if (!isNaN(numericValue)) {
                if (numericValue > max) {
                    numericValue = max; // Giới hạn tối đa
                }
                setInputValue(numericValue.toString());
            } else {
                setInputValue(newValue);
            }
        }
    };


    const applyValue = () => {
        let newValue = parseInt(inputValue, 10);
        if (!isNaN(newValue)) {
            newValue = Math.max(min, Math.min(max, newValue)); // Giới hạn trong khoảng min-max
            onChange(newValue);
            setInputValue(newValue.toString());
        } else {
            setInputValue(value.toString());
        }
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            applyValue();
        }
    };

    return (
        <div className="flex items-center gap-x-2 mt-4">
            <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                <TextComponent text="Hiển thị" weight="thin" italic={true} />
            </span>
            <input
                type="number"
                value={inputValue}
                min={min}
                max={max}
                onChange={handleChange}
                onBlur={applyValue}
                onKeyDown={handleKeyDown}
                className="outline-[#ff7506] min-h-[38px] py-2 px-2.5 block w-14
                border border-border-orange rounded-lg text-sm text-center focus:border-[#ff7506] focus:ring-[#ff7506]
                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                disabled:opacity-50 disabled:pointer-events-none dark:border-border-orange dark:text-neutral-400
                dark:focus:ring-[#ff7506]"
                style={{ MozAppearance: "textfield" }}
            />
            <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                <TextComponent text="hàng trong mỗi trang" weight="thin" italic={true} />
            </span>
        </div>
    );
};

export default ItemsPerPage;
