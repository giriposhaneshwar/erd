import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'app/appConfiguration/config';

@Injectable({ providedIn: 'root' })
export class IncidentsService {
    apiUrl: any;
    constructor(private http: HttpClient, private config: Config) {
      this.apiUrl = this.config.API_URL;
    }
  


    getBuoysIncidentData(): Observable<any[]> {
        let bodyParams = {"fromDate":"2018-09-27", "toDate": "2018-09-28" };
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.apiUrl + "/GetIncidents", bodyParams, { headers: headers_value })
    }

    getBloomsIncidentData(): Observable<any[]> {
        let bodyParams = {"fromDate":" 2018-10-24", "toDate": " 2018-10-24" };
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.apiUrl + "/GetAlgalbloomIncidents", bodyParams, { headers: headers_value })
    }
}