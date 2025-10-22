import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { Product ,Category} from '../../models/product.models';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5245/api/Product';
  product!: Product;
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    const token = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<Product[]>(`${this.apiUrl}/Products`, { headers });
  }

  getProductDetails(id:number):Observable<Product>{
    const token = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<Product>(`${this.apiUrl}/Details?id=${id}`,{headers});
  }

  createProduct(product: Product, imageFile?: File): Observable<Product> {
    const token = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const formData = new FormData();
        formData.append('Name', product.name);
        formData.append('Price', product.price.toString());
        formData.append('Description', product.description);
        formData.append('Status', product.status);

        if (imageFile) {
        formData.append('ImageFile', imageFile, imageFile.name);
        }
    return this.http.post<Product>(`${this.apiUrl}/Create`, formData, {headers});
  }

    editProduct(product:Product , imageFile?:File): Observable<Product> {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`
            };
        const formData = new FormData();
            formData.append('Id',product.id.toString());
            formData.append('Name', product.name);
            formData.append('Price', product.price.toString());
            formData.append('Description', product.description);
            formData.append('Status', product.status);
            formData.append('CategoryId', product.categoryId.toString());
            if (imageFile) {
                formData.append('ImageFile', imageFile, imageFile.name);
            }
        return this.http.put<Product>(`${this.apiUrl}/Edit/${product.id}`, formData, {headers});
    }

    getProductById(id: number): Observable<Product> {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return this.http.get<Product>(`${this.apiUrl}/Edit/${id}`, {headers});
    }
    getProductByIdDelete(id: number): Observable<Product> {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return this.http.get<Product>(`${this.apiUrl}/Delete/${id}`, {headers});
    }
    deleteProduct(id:number){
        const token = localStorage.getItem("access_token");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return this.http.delete<void>(`${this.apiUrl}/Delete/${id}`, {headers})

    }
    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/GetAll`);
    }
}
