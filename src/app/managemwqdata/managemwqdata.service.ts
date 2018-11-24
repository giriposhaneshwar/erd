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

  fetchCategoryList(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetCategoryList", bodyParams, { headers: headers_value })
  }

  fetchStationsList(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetStationsList", bodyParams, { headers: headers_value })
  }

  fetchSitesList(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetSitesList", bodyParams, { headers: headers_value })
  }
}