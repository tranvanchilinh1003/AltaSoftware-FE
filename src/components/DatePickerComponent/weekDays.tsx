const WeekDays = () => {
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    return (
        <div className="grid grid-cols-7 justify-between text-center pb-2 pt-1 text-sm font-medium capitalize text-[#0B80EC] sm:text-lg dark:text-dark-6">
            {days.map((day, index) => (
                <span
                    key={index}
                    className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px] text-base "
                >
                    {day}
                </span>
            ))}
        </div>
    );
};

export default WeekDays;
