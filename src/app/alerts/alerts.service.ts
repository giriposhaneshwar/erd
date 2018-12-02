import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'app/appConfiguration/config';

@Injectable({ providedIn: 'root' })
export class AlertService {
    apidomain = window.location.origin;
    //apiUrl = this.apidomain+'MWQWebservice/MWQSitesRestServices.svc';
    constructor(private http: HttpClient, private config:Config) { }

    getAlertsData(fromDate,toDate): Observable<any[]> {
        let bodyParams = {"fromDate":fromDate, "toDate":toDate};
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.config.API_URL + "/GetAlert", bodyParams, { headers: headers_value })
    }

    createIncidentForAlertsData(alertid,createdBy): Observable<any[]> {
        let bodyParams = {"alertId":alertid, "createdBy":createdBy};
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.config.API_URL + "/IncidentCreate", bodyParams, { headers: headers_value })
    }
}