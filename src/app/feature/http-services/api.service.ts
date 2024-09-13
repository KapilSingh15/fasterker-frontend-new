import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  responseType = { 
    observe: "response",
  };

  miniCartSubject = new ReplaySubject(1);
  // setBaseSiteId(url: string) {
  //   // const formatedURl = 'http://103.89.44.59/skytrackerapi/api/' + url
  //   const formatedURl = 'http://localhost:8091/v1/' + url  
  //   return formatedURl;
  // }

  setBaseSiteIdLocal(url: string) {
    // const formatedURl = 'http://143.110.242.217:8041/v1/' + url
    const formatedURl = 'https://skytracker.skylabsapp.com/v1/' + url
    // const formatedURl = 'http://localhost:8091/v1/' + url  
    return formatedURl;
  }

  getData(urlData: any, options: any = {}): Observable<any> {
    let requestOptions = { ...this.responseType, ...options };
    return this.http
      .get(this.setBaseSiteIdLocal(urlData), requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getDataWithParamValue(path: string, payload: any): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll(payload);
    return this.http.get(this.setBaseSiteIdLocal(path), { params: params }).pipe();
  }

  postData(url: any, payload: any, options: any = {}): Observable<any> {
    let requestOptions = { ...options, ...this.responseType };    
    return this.http.post(this.setBaseSiteIdLocal(url), payload, requestOptions);
  } 

  deleteData(url: string, payload: any, options: any = {}): Observable<any> {
    let requestOptions = { ...options, body: payload, ...this.responseType };
    return this.http
      .delete(this.setBaseSiteIdLocal(url), requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  


  get(urlData: any, options: any = {}): Observable<any> {
    let requestOptions = { ...this.responseType, ...options };
    return this.http
      .get(this.setBaseSiteIdLocal(urlData), requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getDataWithParam(path: string, payload: any): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll(payload);
    return this.http.get(this.setBaseSiteIdLocal(path), { params: params }).pipe();
  }

  post(url: any, payload: any, options: any = {}): Observable<any> {
    let requestOptions = { ...options, ...this.responseType };    
    return this.http.post(this.setBaseSiteIdLocal(url), payload, requestOptions);
  } 

  put(url: any, payload: any, options: any = {}) {
    let requestOptions = { ...options, ...this.responseType };
    return this.http
      .put(this.setBaseSiteIdLocal(url), payload, requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  patch(url: any, payload: any, options: any = {}) {
    let requestOptions = { ...options, ...this.responseType };
    return this.http
      .patch(this.setBaseSiteIdLocal(url), payload, requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  delete(url: any, options: any = {}): Observable<any> {
    let requestOptions = { ...options, ...this.responseType };
    return this.http
      .delete(this.setBaseSiteIdLocal(url), requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }










  // getUserDetails(url: any) {
  //   const requestUrl = environment.baseAPIURl + url;
  //   const headers = new HttpHeaders()
  //     .set("Access-Control-Allow-Origin", "*")
  //     .set("Access-Control-Allow-Headers", "Content-Type")
  //     .set(
  //       "Authorization",
  //       "Basic " +
  //         btoa(
  //           `${environment.onDemand.clientId}:${environment.onDemand.secret}`
  //         )
  //     )
  //     .set("Content-Type", "application/json");
  //   return this.http.post(requestUrl, {}, { headers: headers });
  // }

  // getHomePageDate(url: any): Observable<any> {
  //   return this.http
  //     .get(this.setBaseSiteId(url))
  //     .pipe(catchError((error: HttpErrorResponse) => of(error)));
  // }
}
