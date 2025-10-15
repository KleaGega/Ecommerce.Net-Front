import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { Product } from '../../models/product.models';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5245/api/Product';
  product!: Product;
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Products`);
  }
  getProductDetails(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/Details?id=${id}`);
  }
  createProduct(product: Product, imageFile?: File): Observable<Product> {
  const formData = new FormData();
  formData.append('Name', product.name);
  formData.append('Price', product.price.toString());
  formData.append('Description', product.description);
  formData.append('Status', product.status);

  if (imageFile) {
    formData.append('ImageFile', imageFile, imageFile.name);
  }

  return this.http.post<Product>(`${this.apiUrl}/Create`, formData);
}

  
}
