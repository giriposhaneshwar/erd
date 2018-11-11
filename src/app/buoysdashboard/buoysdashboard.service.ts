import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BuoysDashboardService {

  buoysDashboardDataUrl = 'http://10.56.84.178/MWQWebservice/MWQSitesRestServices.svc/GetAveragevalue';
  //buoysDashboardDataUrl = 'http://localhost:8080/buoys/fetchBuoysData';
  
  res: any;
  restItems: any = [];
  getTestMethodResult = {};
  
  getRestItemsResponse: any = {
    TestList: [],
    Status: null,
    Message: ""
  };

  constructor(private http: HttpClient) { }

  buoysDashboardData(): Observable<any[]> {

    let bodyParams = { "fromDate": "2017-01-04", "toDate": "2017-01-05","user":1 };
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.buoysDashboardDataUrl, bodyParams, { headers: headers_value })
  }


 /*  restItemsUrl = "http://10.56.84.178/MWQWebservice/MWQSitesRestServices.svc/GetTestMethod";
  getRestItems(): void {
    this.restItemsServiceGetRestItems().subscribe(data => {
      this.res = data;
      console.log(this.res.getTestMethodResult.TestList);
      console.log("Status--> " + this.res.getTestMethodResult.Status);
      console.log("Message--> " + this.res.getTestMethodResult.Message);
      if (this.res.getTestMethodResult.Message === "Message") {
        if (this.getRestItemsResponse != undefined && this.getRestItemsResponse.hasOwnProperty("Status")) {
          if (this.getRestItemsResponse.Status === "Success" && this.getRestItemsResponse.hasOwnProperty("TestList")) {
            if (this.getRestItemsResponse.BuoysList != undefined && this.getRestItemsResponse.BuoysList.length > 0) {
              this.restItems = this.getRestItemsResponse.BuoysList;
            }
          }
        }
      }
      //console.log("----restItems----", this.restItems);
    });
  }

  
  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http.get<any[]>(this.restItemsUrl).pipe(map(data => data));
  }
 */
}