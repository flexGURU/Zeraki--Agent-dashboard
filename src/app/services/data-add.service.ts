// src/app/services/data-add.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { School } from '../models/school.model';

@Injectable({
  providedIn: 'root'
})
export class DataAddService {
  private apiUrl = 'http://localhost:3000'; // Assuming your json-server is running on port 3000

  constructor(private http: HttpClient) {}

  // Add new school
  addSchool(schoolData: School): Observable<any> {
    return this.http.post(`${this.apiUrl}/schools`, schoolData);
  }

  // Add new invoice
  addInvoice(invoiceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/invoices`, invoiceData);
  }

  // Add new collection
  addCollection(collectionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/collections`, collectionData);
  }
}
