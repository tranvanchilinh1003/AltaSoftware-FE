import IconImages from "../../../../components/IconImages";

const NoData = ({ message }: { message?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <img
                src={IconImages.icoCcontentNoData}
                alt="Không có dữ liệu"
                className="max-w-full h-auto"
            />
            <p className="text-black mt-2">{message || "Không có dữ liệu"}</p>
        </div>
    );
};

export default NoData;