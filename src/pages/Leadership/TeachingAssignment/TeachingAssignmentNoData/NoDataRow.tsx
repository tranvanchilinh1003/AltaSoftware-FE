import React from 'react';
import IconImages from '../../../../components/IconImages';
import TextComponent from '../../../../components/Text';
import { TableCell, TableRow } from '../../../../components/ui/tabble';

interface NoDataRowProps {
    colSpan: number;
}

const NoDataRow: React.FC<NoDataRowProps> = ({ colSpan }) => {
    return (
        <TableRow>
            <TableCell
                colSpan={6}
                className="px-4 py-3 text-center text-black text-xs md:text-sm lg:text-base"
            >
                <div className="flex justify-center items-center w-full">
                    <img
                        src={IconImages.icoCcontentNoData}
                        alt="Không có dữ liệu"
                        className="max-w-full h-auto"
                    />
                </div>
                <TextComponent text='Không có dữ liệu' size={20} className="font-extrabold text-[#919eab]"/>
            </TableCell>
        </TableRow>
    );
};

export default NoDataRow;
