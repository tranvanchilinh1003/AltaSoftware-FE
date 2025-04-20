const ActionButtons = ({ onCancel, onApply }: { onCancel: () => void; onApply: () => void }) => {
    return (
        <div className="flex items-center space-x-3 pt-4 sm:space-x-5">
            <button
                id="cancelBtn"
                className="flex h-[50px] w-full items-center justify-center bg-background-gray rounded-md bg-dark text-base font-medium text-white hover:bg-opacity-90"
                onClick={onCancel}
            >
                Hủy
            </button>
            <button
                id="applyBtn"
                className="flex h-[50px] w-full bg-orange-text items-center justify-center rounded-md bg-primary text-base font-medium text-white hover:bg-blue-dark"
                onClick={onApply}
            >
                Chọn
            </button>
        </div>
    );
};

export default ActionButtons;
