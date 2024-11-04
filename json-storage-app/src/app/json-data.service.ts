// src/app/services/json-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  private apiUrl = environment.apiUrl; // Define API base URL in environment

  constructor(private http: HttpClient) {}

  // POST request to store JSON data
  storeJsonData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/store`, data);
  }

  // GET request to retrieve all JSON data
  getAllJsonData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve`);
  }
}
