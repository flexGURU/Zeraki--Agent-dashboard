import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSchools(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schools`);
  }

  getInvoices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/invoices`);
  }

  getCollections(): Observable<any> {
    return this.http.get(`${this.apiUrl}/collections`);
  }
  getInvoicesById(schoolId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/invoices?schoolId=${schoolId}`);
  }

  getCollectionsById(schoolId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/collections?schoolId=${schoolId}`);
  }

  countFinanceSignUps(): Observable<number> {
    return this.getSchools().pipe(
      map((schools: any[]) => {
        return schools.filter(school => school.products.includes('Zeraki Finance')).length;
      })
    );
  }

  countAnlysisSignups(): Observable<number> {
    return this.getSchools().pipe(
      map((schools: any[]) => {
        return schools.filter(school => school.products.includes('Zeraki Analytics')).length;
      })
    );
  }

  countTimetableSignups(): Observable<number> {
    return this.getSchools().pipe(
      map((schools: any[]) => {
        return schools.filter(school => school.products.includes('Zeraki Timetable')).length;
      })
    );
  }
}

