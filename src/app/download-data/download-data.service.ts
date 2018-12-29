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

  downloadIndicesData(fromDate,toDate): Observable<any[]> {
    //let bodyParams = {"fromDate": "2018-09-01" , "toDate": "2018-12-31"};
    let bodyParams = {"fromDate": fromDate , "toDate": toDate};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetIndicesBetweenDates", bodyParams, { headers: headers_value })
  }

  downloadMwqData(fromDate,toDate): Observable<any[]> {
    //let bodyParams = {"fromDate": "2018-09-01", "toDate": "2018-12-31"};
    let bodyParams = {"fromDate": fromDate, "toDate": toDate};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetMWQDownloadData", bodyParams, { headers: headers_value })
  }

  downloadBuoysData(fromDate,toDate): Observable<any[]> {
    //let bodyParams = {"fromDate": "2018-09" , "toDate": "2018-10"};
    let bodyParams = {"fromDate": fromDate , "toDate": toDate};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetBuoysdata", bodyParams, { headers: headers_value })
  }


}