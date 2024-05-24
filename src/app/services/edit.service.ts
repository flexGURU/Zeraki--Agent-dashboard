import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { School } from '../models/school.model';
import { Invoice } from '../models/invoice.model';




@Injectable({
  providedIn: 'root'
})
export class editService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  edit(id: number) {
    return this.http.get<School>(`${this.apiUrl}/schools/${id}`);
  }

  update(data: School) {
    return this.http.put<School>(`${this.apiUrl}/schools/${data.id}`, data);
  
  }
  editInvoice(id: number) {
    return this.http.get<Invoice>(`${this.apiUrl}/invoice/${id}`);
  }

  updateInvoice(data: Invoice) {
    return this.http.put<Invoice>(`${this.apiUrl}/invoice/${data.id}`, data);
  }

  deleteSchool(id: number) {
    return this.http.delete<School>(`${this.apiUrl}/schools/${id}`);

  }
}
