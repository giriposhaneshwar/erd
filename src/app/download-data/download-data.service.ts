import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DownloadDataService {

  apiUrl = 'http://10.56.84.178/MWQWebservice/MWQSitesRestServices.svc';
  constructor(private http: HttpClient) { }

  downloadIndicesData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/getIndices_data", bodyParams, { headers: headers_value })
  }

  downloadMwqData(): Observable<any[]> {
    let bodyParams = {"type":"ALL"};
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