import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../../../shared/constant/API.Constants';
import { ApiService } from '../../../../../../http-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyMasterService {

  constructor(private apiService: ApiService) { }

  companyList(params:any): Observable<any> {
    let url = API_CONSTANTS.companyList
    return this.apiService
      .getDataWithParamValue(url,params)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createCompany(payload:any): Observable<any> {
    let url = API_CONSTANTS.createCompany
    return this.apiService
      .postData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteCompany(compId:any,payload:any): Observable<any> {
    let url = API_CONSTANTS.deleteCompany.replace('{compId}',compId)
    return this.apiService
      .deleteData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateCompany(compId:any, payload:any) : Observable<any> {
    let url = API_CONSTANTS.updateCompany.replace('{compId}', compId)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
    
  }
}
