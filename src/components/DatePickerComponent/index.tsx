import React, { useState, useEffect, useRef, useCallback } from "react";
import { IconCalendarOutline } from "../Icons";
import ActionButtons from "./actionButtons";
import NextMonthButton from "./nextMonthButton";
import PrevMonthButton from "./prevMonthButton";
import WeekDays from "./weekDays";

interface DatePicker1Props {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    ref?: React.Ref<HTMLInputElement>;
    name?: string;
    min?: string | number;
    max?: string | number;
    disabled?: boolean;
}

export default function DatePicker1({ value, onChange, min, max }: DatePicker1Props) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(value || null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const daysContainerRef = useRef<HTMLDivElement>(null);
    const datepickerContainerRef = useRef<HTMLDivElement>(null);

    const formatISODate = (date: Date) => {
        return date.toISOString(); // ISO 8601 format
    };

    // Parse and set min and max date if provided
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const parsedMinDate = min ? new Date(min) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const parsedMaxDate = max ? new Date(max) : null;

    useEffect(() => {
        if (daysContainerRef.current) {
            renderCalendar();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDate, isCalendarOpen]);

    const renderCalendar = useCallback(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const daysContainer = daysContainerRef.current;
        if (!daysContainer) return;
        daysContainer.innerHTML = "";

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement("div");
            daysContainer.appendChild(emptyDiv);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(year, month, i);
            const dayDiv = document.createElement("div");
            dayDiv.className =
                "flex h-[38px] w-[38px] items-center justify-center rounded-[7px] border-[.5px] border-transparent text-dark hover:border-stroke hover:bg-background-orange-1 hover:text-white hover:bg-gray-2 sm:h-[46px] sm:w-[47px] dark:text-black dark:hover:border-dark-3 dark:hover:bg-dark mb-2 text-base cursor-pointer";

            // Disable days outside the allowed range
            if (parsedMinDate && dayDate < parsedMinDate) {
                dayDiv.classList.add("opacity-50", "cursor-not-allowed");
                dayDiv.setAttribute("disabled", "true");
            }
            if (parsedMaxDate && dayDate > parsedMaxDate) {
                dayDiv.classList.add("opacity-50", "cursor-not-allowed");
                dayDiv.setAttribute("disabled", "true");
            }

            dayDiv.textContent = i.toString();
            dayDiv.addEventListener("click", () => {
                if (dayDiv.hasAttribute("disabled")) return;// Don't allow clicks on disabled days
                const selectedDateObj = new Date(year, month, i, 9, 0, 0);
                const formattedISO = formatISODate(selectedDateObj);
                setSelectedDate(formattedISO);
                if (onChange) onChange({ target: { value: formattedISO } } as React.ChangeEvent<HTMLInputElement>);
                // setIsCalendarOpen(false);

                daysContainer.querySelectorAll("div").forEach((d) =>
                    d.classList.remove("bg-background-orange-1", "text-white")
                );
                dayDiv.classList.add("bg-background-orange-1", "text-white", "dark:text-black");
            });

            daysContainer.appendChild(dayDiv);
        }
    }, [currentDate, onChange, parsedMinDate, parsedMaxDate]);

    useEffect(() => {
        if (daysContainerRef.current) {
            renderCalendar();
        }
    }, [currentDate, isCalendarOpen, renderCalendar]);

    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const handleApply = () => {
        if (selectedDate) {
            console.log("Ngày đã chọn:", selectedDate);
            setIsCalendarOpen(false);
        } else {
            console.log("Không có ngày nào được chọn");
        }
    };

    const handleCancel = () => {
        setSelectedDate(null);
        setIsCalendarOpen(false);
    };

    const handleToggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (
            target &&
            datepickerContainerRef.current &&
            !datepickerContainerRef.current.contains(target) &&
            target.id !== "datepicker" &&
            target.id !== "toggleDatepicker"
        ) {
            setIsCalendarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <section className="bg-white">
            <div className="container">
                <div className="mx-auto w-full max-w-full">
                    <div className="relative mb-3">
                        <input
                            id="datepicker"
                            type="text"
                            placeholder="Chọn ngày"
                            className="h-12 w-full appearance-none rounded-lg border border-stroke bg-white pl-4 pr-12 text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                            value={selectedDate ? new Date(selectedDate).toLocaleDateString("vi-VN") : ""}
                            readOnly
                            onClick={handleToggleCalendar}
                        />
                        <span
                            id="toggleDatepicker"
                            onClick={handleToggleCalendar}
                            className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-dark-5 border rounded-e-md border-stroke border-s-1"
                        >
                            <IconCalendarOutline className="text-orange-text size-5" />
                        </span>
                    </div>

                    {isCalendarOpen && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5 z-50 ">
                            <div
                                ref={datepickerContainerRef}
                                id="datepicker-container"
                                className="w-[400px] rounded-xl bg-white p-4 shadow-lg dark:bg-dark-2 dark:shadow-box-dark"
                            >
                                <div className="flex items-center justify-between pb-1">
                                    <PrevMonthButton onClick={handlePrevMonth} />
                                    <span id="currentMonth" className="text-xl font-medium capitalize">
                                        {currentDate.toLocaleDateString("vi-VN", {
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <NextMonthButton onClick={handleNextMonth} />
                                </div>
                                <WeekDays />
                                <div ref={daysContainerRef} className="grid grid-cols-7 text-center text-sm font-medium sm:text-sm text-black">
                                    {/* Days will be rendered here */}
                                </div>
                                <ActionButtons onCancel={handleCancel} onApply={handleApply} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
