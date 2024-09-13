import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../../../shared/constant/API.Constants';

@Injectable({
  providedIn: 'root'
})
export class ResourceMasterService {

  constructor(private apiService: ApiService) { }

  resourceList(params:any): Observable<any> {
    let url = API_CONSTANTS.resourceMasterList
    return this.apiService
      .getDataWithParamValue(url,params)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createResource(payload:any): Observable<any> {
    let url = API_CONSTANTS.addResourceMaster
    return this.apiService
      .postData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  resourceGroupList(): Observable<any> {
    let url = API_CONSTANTS.resourceGroupList
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteResource(resourceId:any,payload:any): Observable<any> {
    let url = API_CONSTANTS.deleteResourceMaster.replace('{resourceId}',resourceId)
    return this.apiService
      .deleteData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateResourceMaster(resourceId:any, payload:any) : Observable<any> {
    let url = API_CONSTANTS.updateResourceMaster.replace('{resourceId}', resourceId)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
    
  }
}
