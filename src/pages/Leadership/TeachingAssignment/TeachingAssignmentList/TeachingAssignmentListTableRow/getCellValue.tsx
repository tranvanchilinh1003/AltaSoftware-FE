import { TeachingAssignment } from "../../../../../types";
import { formatDate } from "../../../../../utils";
import { TableColumn } from "../tableColumns/type";

export const getCellValue = (item: TeachingAssignment, col: TableColumn) => {
    const value = item[col.key as keyof TeachingAssignment];

    if (col.isDate && (typeof value === "string" || typeof value === "number")) {
        return formatDate(typeof value === "number" ? new Date(value) : value);
    }

    if (col.key.includes(".")) {
        return col.key.split(".").reduce((obj: any, key: string) => obj?.[key], item) || "--";
    }

    return value || "--";
};

export { };
