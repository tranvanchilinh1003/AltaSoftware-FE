import React, { useState, useRef, useEffect } from "react";
import { DropdownTimeSelectionProps } from "./type";

const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
const hoursFirstDigit = ["0", "1", "2"];

const DropdownTimeSelection: React.FC<DropdownTimeSelectionProps> = ({
    value = "00:00",
    onChange,
    width = 190,
    className = "",
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState({
        h1: value[0] || "0",
        h2: value[1] || "0",
        m1: value[3] || "0",
        m2: value[4] || "0",
    });

    useEffect(() => {
        const [hours, minutes] = value.split(":");
        const [h1, h2] = hours.split("");
        const [m1, m2] = minutes.split("");
        setSelected({
            h1: h1 || "0",
            h2: h2 || "0",
            m1: m1 || "0",
            m2: m2 || "0",
        });
    }, [value]);

    const handleSelect = (key: "h1" | "h2" | "m1" | "m2", value: string) => {
        setSelected((prev) => {
            const newTime = { ...prev, [key]: value };

            // Ensure h2 doesn't exceed 3 if h1 is 2 (i.e., max 23)
            if (key === "h1" && value === "2" && parseInt(newTime.h2) > 3) {
                newTime.h2 = "3";
            }

            const newValue = `${newTime.h1}${newTime.h2}:${newTime.m1}${newTime.m2}`;
            onChange(newValue); // 🔥 Gọi luôn để giữ đúng dữ liệu hiển thị

            return newTime;
        });
    };

    const handleSave = () => {
        setIsEditing(false); // Chỉ đóng lại dropdown, không cần gọi onChange vì đã gọi rồi khi chọn
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    useEffect(() => {
        if (!isEditing) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                handleSave();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    return (
        <div className={`relative ${className}`} style={{ width }} ref={dropdownRef}>
            {isEditing ? (
                <div
                    className="flex gap-1 border border-gray-300 rounded p-1 bg-white items-center"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    <select value={selected.h1} onChange={(e) => handleSelect("h1", e.target.value)} className="border rounded px-1 w-[40px]">
                        {hoursFirstDigit.map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <select value={selected.h2} onChange={(e) => handleSelect("h2", e.target.value)} className="border rounded px-1 w-[40px]">
                        {numbers.slice(0, selected.h1 === "2" ? 4 : 10).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <span>:</span>
                    <select value={selected.m1} onChange={(e) => handleSelect("m1", e.target.value)} className="border rounded px-1 w-[40px]">
                        {numbers.slice(0, 6).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <select value={selected.m2} onChange={(e) => handleSelect("m2", e.target.value)} className="border rounded px-1 w-[40px]">
                        {numbers.map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div
                    className="border border-gray-300 rounded px-2 py-1 bg-white cursor-pointer"
                    onClick={() => setIsEditing(true)}
                >
                    {`${selected.h1}${selected.h2}:${selected.m1}${selected.m2}`}
                </div>
            )}
        </div>
    );
};

export default DropdownTimeSelection;
