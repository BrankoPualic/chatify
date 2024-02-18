import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl: string = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  postDataJson(data: any, destinationUrl: string): Observable<any> {
    return this.http.post(
      this.baseUrl + destinationUrl,
      data,
      this.httpOptions
    );
  }
  postDataFiles(data: any, destinationUrl: string): Observable<any> {
    return this.http.post(this.baseUrl + destinationUrl, data);
  }

  getData(destinationUrl: string): Observable<any> {
    return this.http.get(this.baseUrl + destinationUrl, this.httpOptions);
  }

  deleteData(destinationUrl: string): Observable<any> {
    return this.http.delete(this.baseUrl + destinationUrl, this.httpOptions);
  }

  patchData(data: any, destinationUrl: string): Observable<any> {
    return this.http.patch(
      this.baseUrl + destinationUrl,
      data,
      this.httpOptions
    );
  }
}
