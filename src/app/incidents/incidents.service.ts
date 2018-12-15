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

    getBuoysIncidentData(fromDate,toDate): Observable<any[]> {
        //let bodyParams = {"fromDate":"2018-09-27", "toDate": "2018-09-28" };
        let bodyParams = {"fromDate":fromDate, "toDate": toDate };
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.apiUrl + "/GetIncidents", bodyParams, { headers: headers_value })
    }

    getBuoysIncidentHistoryInfo(selectedIncidentId): Observable<any[]> {
        //let bodyParams = {"fromDate":"2018-09-27", "toDate": "2018-09-28" };
        let bodyParams = {"incidentId":selectedIncidentId };
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.apiUrl + "/GetIncidentHistory", bodyParams, { headers: headers_value })
    }

    updateBuoysIncidentInfo(selectedIncidentId,incUpdatedBy,incStatus,incComments): Observable<any[]> {
        //let bodyParams = {"fromDate":"2018-09-27", "toDate": "2018-09-28" };
        let bodyParams = {"incidentId":selectedIncidentId,"updatedBy": incUpdatedBy,"status":incStatus,"remarks":incComments};
        console.log("bodyParams---"+JSON.stringify(bodyParams));
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.apiUrl + "/IncidentStatusUpdate", bodyParams, { headers: headers_value })
    }

    getBloomsIncidentData(fromDate,toDate): Observable<any[]> {
        //let bodyParams = {"fromDate":"2018-10-24", "toDate": "2018-10-24" };
        let bodyParams = {"fromDate":fromDate, "toDate": toDate };
        console.log(bodyParams);
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.apiUrl + "/GetAlgalbloomIncidents", bodyParams, { headers: headers_value })
    }

    addBloomsIncidentInfo(blommIncidentInfo): Observable<any[]> {
        let bodyParams = JSON.stringify(blommIncidentInfo);
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.apiUrl + "/CreateAlgalBloomIncidents", bodyParams, { headers: headers_value })
    }
}