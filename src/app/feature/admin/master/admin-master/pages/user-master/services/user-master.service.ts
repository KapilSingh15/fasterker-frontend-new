import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../../../http-services/api.service';
import { API_CONSTANTS } from '../../../../../../shared/constant/API.Constants';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(private apiService: ApiService) { }

  userMasterList(params:any): Observable<any> {
    let url = API_CONSTANTS.userMasterList
    return this.apiService
      .getDataWithParamValue(url,params)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createUserMaster(payload:any): Observable<any> {
    let url = API_CONSTANTS.createUserMaster
    return this.apiService
      .postData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateUser(userId:any, payload:any) : Observable<any> {
    let url = API_CONSTANTS.updateUser.replace('{userId}', userId)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
    
  }

  deleteUserMaster(userId:any,payload:any): Observable<any> {
    let url = API_CONSTANTS.deleteUser.replace('{userId}',userId)
    return this.apiService
      .deleteData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
