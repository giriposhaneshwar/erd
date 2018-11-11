import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    apiUrl = 'http://10.56.84.178/MWQWebservice/MWQSitesRestServices.svc';
    constructor(private http: HttpClient) { }


    getAlertsData(): Observable<any[]> {
        let bodyParams = {"fromDate":"2018-10-11", "toDate": "2018-10-11"};
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.apiUrl + "/GetAlert", bodyParams, { headers: headers_value })
    }
}