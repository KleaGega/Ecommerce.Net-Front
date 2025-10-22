import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { Category } from '../../models/product.models';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5245/api/Category';
  category!: Category;
  constructor(private http: HttpClient) {}

    getAllCategories(): Observable<Category[]> {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return this.http.get<Category[]>(`${this.apiUrl}/GetAll`, { headers });
    }

    getCategoryById(id:number):Observable<Category>{
        return  this.http.get<Category>(`${this.apiUrl}/GetCategoryId?id=${id}`);
    }

    createCategory(category: Category): Observable<Category> {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const formData = new FormData();
            formData.append('Name', category.name);
            formData.append('Description', category.description);
        return this.http.post<Category>(`${this.apiUrl}/Create`,JSON.stringify(category), { headers });
    }

    editCategory(category: Category): Observable<Category> {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        return this.http.put<Category>(`${this.apiUrl}/Edit/${category.id}`, category, { headers });
    }

    getCategoryByIdDelete(id: number): Observable<Category> {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return this.http.get<Category>(`${this.apiUrl}/Delete/${id}`, {headers});
    }

    deleteCategory(id:number){
        const token = localStorage.getItem("access_token");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return this.http.delete<void>(`${this.apiUrl}/Delete/${id}`, {headers})
    }
}
