import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from 'app/appConfiguration/config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ManageMwqDataService {

  jsonapiUrl = "assets/data/projectNames.json";

  apiUrl: any;
  constructor(private http: HttpClient, private config: Config) {
    this.apiUrl = this.config.API_URL;
  }


  /* CONFIGURE PARAMETERS START */
  fetchParametersList(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetParametersList", bodyParams, { headers: headers_value })
  }
  updateParameterStatus(status, paramId, updatedBy): Observable<any[]> {
    let bodyParams = { "paramId": paramId, "status": status, "updatedBy": updatedBy };
    //console.log(bodyParams);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/ParameterStatusUpdate", bodyParams, { headers: headers_value })
  }
  addParameterInfo(paramInfo): Observable<any[]> {
    let bodyParams = { paramInfo };
    //console.log(bodyParams);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/ParametersCreate", bodyParams, { headers: headers_value })
  }
  /* CONFIGURE PARAMETERS END */




  /* CONFIGURE PARAMETERS START */
  fetchCategoryList(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetCategoryList", bodyParams, { headers: headers_value })
  }
  updateCategoryStatus(categoryId, updatedBy, status): Observable<any[]> {
    let bodyParams = { "categoryId": categoryId, "UpdatedBy": updatedBy, "status": status };
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/CategoryStatusUpdate", bodyParams, { headers: headers_value })
  }
  addCategoryInfo(categoryInfo): Observable<any[]> {
    let bodyParams = JSON.stringify(categoryInfo);
    // console.log("---addCategoryInfo-addCategoryInfo-----" + bodyParams);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/CategoryInsert", bodyParams, { headers: headers_value })
  }
  /* CONFIGURE PARAMETERS END */

  /* MANAGE STATION StART */
  fetchStationsList(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetStationsList", bodyParams, { headers: headers_value })
  }
  addStationInfo(stationInfo): Observable<any[]> {
    let bodyParams = JSON.stringify(stationInfo);
    //console.log("---addCategoryInfo-addCategoryInfo-----" + bodyParams);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/StationsCreate", bodyParams, { headers: headers_value })
  }
  updateStationStatus(stationId, updatedBy, status): Observable<any[]> {
    let bodyParams = { "stationId": stationId, "updatedBy": updatedBy, "status": status };
    console.log(bodyParams);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/StationsStatusUpdate", bodyParams, { headers: headers_value })
  }
  /* MANAGE STATION END */

  /* MANAGE SITES StART */
  fetchSitesList(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetSitesList", bodyParams, { headers: headers_value })
  }
  updateSitesStatus(siteId, updatedBy, status): Observable<any[]> {
    let bodyParams = { "siteId": siteId, "UpdatedBy": updatedBy, "status": status };
    console.log(bodyParams);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/SiteStatusUpdate", bodyParams, { headers: headers_value })
  }
  addSiteInfo(siteInfo): Observable<any[]> {
    let bodyParams = JSON.stringify(siteInfo);
    console.log("---addsiteInfo----" + bodyParams);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/SitesCreate", bodyParams, { headers: headers_value })
  }
  /* MANAGE SITES END */

  /* MANAGE VENDORS START */
  addVendorInfo(vendorInfo): Observable<any[]> {
    let bodyParams = JSON.stringify(vendorInfo);
    console.log("---addvendorInfo----" + bodyParams);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/VendorCreate", bodyParams, { headers: headers_value })
  }
  fetchVendorsList(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetVendorsList", bodyParams, { headers: headers_value })
  }
  updatVendorStatus(vendorId, status): Observable<any[]> {
    let bodyParams = { "vendorId": vendorId, "status": status };
    console.log(bodyParams);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/VendorStatusUpdate", bodyParams, { headers: headers_value })
  }
  /* MANAGE VENDORS END */
}