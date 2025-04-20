 
 export interface DataTable{
    titleList: propertyObj[], 
    data:Student[]
} 
export interface TableList{
    "students":Student[],
    "subject":Student[]
} 
export interface Student {
    [key: string]: string,
}
interface propertyObj{
    propertyName:String, 
}
 