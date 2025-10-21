
export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imagePath: string;
}

export interface CartResponse {
  userName: string;
  cartItems: CartItem[];
}
export interface UpdateQuantityRequest {
  userId: string;
  productId: number;
  quantity: number;
}