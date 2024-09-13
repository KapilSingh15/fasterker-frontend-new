import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../../../shared/constant/API.Constants';

@Injectable({
  providedIn: 'root'
})
export class RoleMasterService {

  constructor(private apiService: ApiService) { }

  roleMasterList(params:any): Observable<any> {
    let url = API_CONSTANTS.roleMasterList
    return this.apiService
      .getDataWithParamValue(url,params)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addRole(payload:any): Observable<any> {
    let url = API_CONSTANTS.addRole
    return this.apiService
      .postData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteRole(roleId:any,payload:any): Observable<any> {
    let url = API_CONSTANTS.deleterole.replace('{roleId}',roleId)
    return this.apiService
      .deleteData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

 
  updateRole(roleId:any, payload:any) : Observable<any> {
    let url = API_CONSTANTS.updateRole.replace('{roleId}', roleId)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));   
  }
}
