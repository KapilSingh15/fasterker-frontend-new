import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../../../shared/constant/API.Constants';
import { ApiService } from '../../../../../../http-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ResourcePermissionService {

  constructor(private apiService: ApiService) { }

  resourcePermissionList(params:any): Observable<any> {
    let url = API_CONSTANTS.resourcePermissionList
    return this.apiService
      .getDataWithParamValue(url,params)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  resourceForPermission(roleId:any) : Observable<any> {
    let url = API_CONSTANTS.resourceForPermission.replace('{roleId}', roleId)
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error))); 
  }


  addPermission(payload:any): Observable<any> {
    let url = API_CONSTANTS.addPermission
    return this.apiService
      .postData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


}
