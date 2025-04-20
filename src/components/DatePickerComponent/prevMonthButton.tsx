import { IconOutlineArrowLeftSingle } from "../Icons";

const PrevMonthButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            type="button"
            id="prevMonth"
            className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[7px] border-[.5px] border-none bg-gray-2 text-dark hover:border-primary hover:bg-primary hover:text-white sm:h-[46px] sm:w-[46px] dark:border-dark-3 dark:bg-dark dark:text-white"
            onClick={onClick}
        >
            <IconOutlineArrowLeftSingle className="text-orange-text" />
        </button>
    );
};

export default PrevMonthButton;
