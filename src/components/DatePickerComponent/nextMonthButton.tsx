import { IconOutlineArrowRightSingle } from "../Icons";

const NextMonthButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            type="button"
            id="nextMonth"
            className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[7px] border-[.5px] border-none text-dark hover:text-white sm:h-[46px] sm:w-[46px] dark:border-dark-3 dark:bg-dark dark:text-white"
            onClick={onClick}
        >
            <IconOutlineArrowRightSingle className="text-orange-text" />
        </button>
    );
};

export default NextMonthButton;
