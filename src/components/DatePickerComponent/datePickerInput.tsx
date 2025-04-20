import { IconCalendarOutline } from "../Icons";


const DatePickerInput = ({
    selectedDate,
    onToggleCalendar,
}: {
    selectedDate: string | null;
    onToggleCalendar: () => void;
}) => {
    return (
        <div className="relative mb-3">
            <input
                id="datepicker"
                type="text"
                placeholder="Chọn ngày"
                className="h-12 w-full appearance-none rounded-lg border border-stroke bg-white pl-4 pr-12 text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                value={selectedDate || ""}
                readOnly
                onClick={onToggleCalendar}
            />
            <span
                id="toggleDatepicker"
                onClick={onToggleCalendar}
                className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-dark-5 border rounded-e-md border-stroke border-s-1"
            >
                <IconCalendarOutline className="text-orange-text size-5" />
            </span>
        </div>
    );
};

export default DatePickerInput;
