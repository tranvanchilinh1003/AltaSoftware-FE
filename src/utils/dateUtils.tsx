export const formatDate = (date: string | Date | null | undefined): string => {
    if (!date || isNaN(new Date(date).getTime())) return "N/A";
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;
};
export const convertToISODate = (dateStr: string, time: string = "00:00:00"): string => {
    console.log("Đầu vào convertToISODate:", dateStr);
    if (!dateStr || dateStr.trim() === "") return "Invalid Date";

    const isoDate = new Date(dateStr).toISOString().split("T")[0]; // Chỉ lấy phần YYYY-MM-DD
    return `${isoDate}T${time}`; // Bổ sung thời gian
};



