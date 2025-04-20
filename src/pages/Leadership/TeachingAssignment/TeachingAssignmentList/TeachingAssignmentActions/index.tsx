import IconImages from "../../../../../components/IconImages";

interface TeachingAssignmentActionsProps {
    selectedIds: number[];
    onDeleteMany: () => void;
}


const TeachingAssignmentActions = ({ selectedIds, onDeleteMany }: TeachingAssignmentActionsProps) => {
    const isDeleteActive = selectedIds.length > 0;

    return (
        <div className="bg-white sm:rounded-t-lg overflow-hidden antialiased md:py-4">
            <div className="flex justify-end items-center bg-white p-2">
                <div className="flex gap-2">
                    <div className="flex gap-4 items-center justify-center">
                        <img
                            src={IconImages.iconTrashBinOutlineOrange}
                            alt="Delete"
                            className={`w-5 h-5 md:w-6 md:h-6 object-contain ${isDeleteActive ? 'opacity-100 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                                }`}
                            onClick={isDeleteActive ? onDeleteMany : undefined}
                        />
                        <div style={{ border: '1px solid gray', height: '30px' }}></div>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded">
                            + Thêm mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeachingAssignmentActions;
