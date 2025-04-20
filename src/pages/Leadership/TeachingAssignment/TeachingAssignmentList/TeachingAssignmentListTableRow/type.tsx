import { TeachingAssignment } from "../../../../../types";

export interface TeachingAssignmentListTableRowProps {
    item: any;
    index: number;
    isChecked?: boolean;
    onItemChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete?: (item: any) => void;
    startIndex?: number;
    onEdit: (item: TeachingAssignment) => void;
}

