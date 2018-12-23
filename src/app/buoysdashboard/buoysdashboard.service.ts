import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'app/appConfiguration/config';


//declare var $: any;

@Injectable({ providedIn: 'root' })
export class BuoysDashboardService  {

  res: any;
  restItems: any = [];
  getTestMethodResult = {};
  
  getRestItemsResponse: any = {
    TestList: [],
    Status: null,
    Message: ""
  };
  todayDate : any;
  constructor(private http: HttpClient, private config:Config) {}


  buoysDashboardData(fromDate,toDate): Observable<any[]> {
 let bodyParams = { "fromDate": "2018-09-01", "toDate": "2018-10-31","user":1  };
//  let bodyParams = { "fromDate": fromDate, "toDate": toDate,"user":1 };
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.config.API_URL+ "/GetAveragevalue", bodyParams, { headers: headers_value })
  }
}