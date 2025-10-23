export interface Order {
    id:number;
    userId: string;
    orderDate: string;
    totalAmount: number;
    status: string;
    items: OrderItems[];

}
export interface OrderItems {
    productId:number;
    productName: string;
    imagePath:string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
}