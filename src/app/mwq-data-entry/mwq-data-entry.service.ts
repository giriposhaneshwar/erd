import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from 'app/appConfiguration/config';

@Injectable({ providedIn: 'root' })
export class MwqDataEntryService {

  //apiUrl = 'http://10.56.84.178/MWQWebservice/MWQSitesRestServices.svc';
  jsonapiUrl = "assets/data/";

  apiUrl: any;
  constructor(private http: HttpClient, private config: Config) {
    this.apiUrl = this.config.API_URL;
  }

  fetchSiteCategoryData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetCategory", bodyParams, { headers: headers_value })
  }
  postFileUpload(file): Observable<any[]> {
    let bodyParams = {file};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers_value = headers_value.set("Content-Type", "multipart/form-data");
  //  headers_value = headers_value.set("Content-Disposition", "form-data");
   // headers_value = headers_value.set("Content-Type", "text/plain ");
//    headers_value = headers_value.set("Access-Control-Allow-Origin", "*");
    return this.http.post<any[]>(this.apiUrl +"/SaveFile", bodyParams, { headers: headers_value })
  }

  fetchHistoricalGraph(): Observable<any[]> {
   /*  let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set("Content-Type", "application/json");
    return this.http.post<any[]>(this.apiUrl + "/GetParmsHistrocalData", bodyParams, { headers: headers_value }) */

    return this.http.get<any[]>(this.jsonapiUrl+"graph.json").pipe(map(data => data));
  }

  fetchParametersValdationValues(): Observable<any[]> {
    /*let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set("Content-Type", "application/json");
    return this.http.post<any[]>(this.apiUrl + "/GetparamatersValdationValues", bodyParams, { headers: headers_value })
    */
   return this.http.get<any[]>(this.jsonapiUrl+"GetparamatersValdationValues.json").pipe(map(data => data));
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

    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetProjects ", bodyParams, { headers: headers_value })

    // return this.http.get<any[]>(this.jsonapiUrl).pipe(map(data => data));
  }

  saveMWQDataEntryInfo(jsonMwqDataEntryInfo): Observable<any[]> {
    /*     console.log(" ---------------- " + JSON.stringify(jsonMwqDataEntryInfo));
        let bodyParams = jsonMwqDataEntryInfo; */
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/loadData", JSON.stringify(jsonMwqDataEntryInfo), { headers: headers_value })
  }

  fetchQcInfoData(): Observable<any[]> {
    let bodyParams = {};
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetQcInfo ", bodyParams, { headers: headers_value })
  }

  fetchDataEntryRecord(sampleRefNo): Observable<any[]> {
    let bodyParams = { "sampleRefNum": sampleRefNo };
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/GetDataEntryRecord ", bodyParams, { headers: headers_value })
  }

  updateMWQDataEntryInfo(jsonMwqDataEntryInfo): Observable<any[]> {
    /*     console.log(" ---------------- " + JSON.stringify(jsonMwqDataEntryInfo));
        let bodyParams = jsonMwqDataEntryInfo; */
    let headers_value = new HttpHeaders();
    headers_value = headers_value.set('Content-Type', 'application/json');
    return this.http.post<any[]>(this.apiUrl + "/updateData", JSON.stringify(jsonMwqDataEntryInfo), { headers: headers_value })
  }
}