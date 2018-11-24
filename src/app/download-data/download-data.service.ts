import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'app/appConfiguration/config';

@Injectable({ providedIn: 'root' })
export class DownloadDataService {

  apiUrl: any;
  constructor(private http: HttpClient, private config: Config) {
    this.apiUrl = this.config.API_URL;
  }

  downloadIndicesData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/getIndices_data", bodyParams, { headers: headers_value })
  }

  downloadMwqData(): Observable<any[]> {
    let bodyParams = { "type": "ALL" };
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetIndices", bodyParams, { headers: headers_value })
  }

  downloadBuoysData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetSource", bodyParams, { headers: headers_value })
  }


}