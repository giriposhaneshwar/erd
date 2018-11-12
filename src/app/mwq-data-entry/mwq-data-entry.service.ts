import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MwqDataEntryService {

  apiUrl = 'http://10.56.84.178/MWQWebservice/MWQSitesRestServices.svc';
  jsonapiUrl = "assets/data/projectNames.json";
  constructor(private http: HttpClient) { }

  fetchSiteCategoryData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetCategory", bodyParams, { headers: headers_value })
  }
  postFileUpload(data): Observable<any[]> {
    let bodyParams = JSON.stringify(data);
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set("Content-Type", "application/json");
    headers_value = headers_value.set("Access-Control-Allow-Origin", "*");
    return this.http.post<any[]>("http://localhost/php/", data, {
      headers: headers_value
    });
  }
  fetchHistoricalGraph(): Observable<any[]> {
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set("Content-Type", "application/json");
    headers_value = headers_value.set("Access-Control-Allow-Origin", "*");
    return this.http.get<any[]>("../../assets/data/graph.json", {
      headers: headers_value
    });
  }

  fetchSiteNameData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetSite", bodyParams, { headers: headers_value })
  }

  fetchSourceNameData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetSource", bodyParams, { headers: headers_value })
  }

  fetchPreservationData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetPreservation", bodyParams, { headers: headers_value })
  }

  fetchSampleByData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetSampleby ", bodyParams, { headers: headers_value })
  }

  fetchEventTypeData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetEventby ", bodyParams, { headers: headers_value })
  }

  fetchMQLData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetMQL ", bodyParams, { headers: headers_value })
  }

  fetchTestMethodData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetTestMethod ", bodyParams, { headers: headers_value })
  }

  fetchExtractionMethodData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetExtraction ", bodyParams, { headers: headers_value })
  }

  fetchProjectNamesData(): Observable<any[]> {
    /*     
        let bodyParams = {};
        let headers_value = new HttpHeaders();
        headers_value = headers_value.set('Content-Type', 'application/json');
        return this.http.post<any[]>(this.apiUrl + "/GetExtraction ", bodyParams, { headers: headers_value }) 
    */
    return this.http.get<any[]>(this.jsonapiUrl).pipe(map(data => data));
  }

  saveMWQDataEntryInfo(jsonMwqDataEntryInfo): Observable<any[]> {
    /*     console.log(" ---------------- " + JSON.stringify(jsonMwqDataEntryInfo));
        let bodyParams = jsonMwqDataEntryInfo; */
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/loadData", JSON.stringify(jsonMwqDataEntryInfo), { headers: headers_value })
  }
}