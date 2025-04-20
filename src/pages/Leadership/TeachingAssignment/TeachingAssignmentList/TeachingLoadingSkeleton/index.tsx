import { TableCell, TableRow } from "../../../../../components/ui/tabble";

const LoadingSkeleton = ({ pageSize, columns }: { pageSize: number; columns: { key: string }[] }) => {
    return (
        <>
            {[...Array(pageSize)].map((_, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-[#F0F3F6] border-[#F0F3F6] animate-pulse' : ''}>

                    {/* Data Columns */}
                    {columns.map((col) => (
                        <TableCell key={col.key} className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base">
                            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                        </TableCell>
                    ))}
                    <TableCell className="px-4 py-3 text-start">
                        <div className="w-10 h-5 bg-gray-300 rounded"></div>
                    </TableCell>
                    {/* Action Buttons Column */}
                    <TableCell className="px-4 py-3 text-start w-[150px]">
                        <div className="flex gap-2">
                            <div className="w-10 h-5 bg-gray-300 rounded"></div>
                            <div className="w-10 h-5 bg-gray-300 rounded"></div>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default LoadingSkeleton;
