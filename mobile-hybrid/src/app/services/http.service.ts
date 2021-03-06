import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  post(serviceName: string, data: any) {
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    const options = { headers: headers };
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, data, options);
  }
}