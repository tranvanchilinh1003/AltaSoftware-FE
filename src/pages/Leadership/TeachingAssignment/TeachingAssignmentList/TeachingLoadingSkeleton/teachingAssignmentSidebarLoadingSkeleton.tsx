const TeachingAssignmentSidebarLoadingSkeleton = ({ pageSize }: { pageSize: number }) => {
    return (
        <div className="space-y-2">
            {[...Array(pageSize)].map((_, index) => (
                <div
                    key={index}
                    className="block w-full text-left p-3 mt-2 rounded-lg border bg-gray-200 animate-pulse h-10"
                ></div>
            ))}
        </div>
    );
};

export default TeachingAssignmentSidebarLoadingSkeleton;

