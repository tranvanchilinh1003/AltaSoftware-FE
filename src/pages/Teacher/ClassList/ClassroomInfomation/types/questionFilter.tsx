import { ChatCategory } from '../types/questionCategory';
export interface FilterState {
    questionCategory?: ChatCategory;
    [key: string]: string | number | ChatCategory | ChatCategory[] | undefined | string[];
}
