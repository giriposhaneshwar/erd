import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from 'app/appConfiguration/config';

@Injectable({ providedIn: 'root' })
export class BuoysDashboardService {

  res: any;
  restItems: any = [];
  getTestMethodResult = {};
  
  getRestItemsResponse: any = {
    TestList: [],
    Status: null,
    Message: ""
  };

  constructor(private http: HttpClient, private config:Config) { }

  buoysDashboardData(fromDate,toDate): Observable<any[]> {
 let bodyParams = { "fromDate": "2017-01-04", "toDate": "2017-01-05","user":1 };
//  let bodyParams = { "fromDate": fromDate, "toDate": toDate,"user":1 };
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.config.API_URL+ "/GetAveragevalue", bodyParams, { headers: headers_value })
  }
}