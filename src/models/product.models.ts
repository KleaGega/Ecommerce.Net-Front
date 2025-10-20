export interface Product {
    id: number;
    name:string;
    price:number;
    description:string;
    categoryId:number;
    status:string;
    imagePath:string;
    categoryName?: string;
}
export interface Category {
    id:number;
    name:string;
    description:string;
}