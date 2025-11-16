import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Requests {
  private http = inject(HttpClient);

  private baseUrl = 'https://www.thesportsdb.com';

  // GET request
  get<T>(endpoint: string, params?: Record<string, string | number>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, String(params[key]));
      });
    }
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }

  // POST request
  post<T>(endpoint: string, body: any, headers?: Record<string, string>): Observable<T> {
    const httpHeaders = new HttpHeaders(headers || { 'Content-Type': 'application/json' });
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers: httpHeaders });
  }

  // PUT request
  put<T>(endpoint: string, body: any, headers?: Record<string, string>): Observable<T> {
    const httpHeaders = new HttpHeaders(headers || { 'Content-Type': 'application/json' });
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers: httpHeaders });
  }

  // DELETE request
  delete<T>(endpoint: string, params?: Record<string, string | number>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, String(params[key]));
      });
    }
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }
}
