import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../../../http-services/api.service';
import { API_CONSTANTS } from '../../../../../../shared/constant/API.Constants';

@Injectable({
  providedIn: 'root'
})
export class ResourceGroupService {

  constructor(private apiService: ApiService) { }

  resourceGroupList(params:any): Observable<any> {
    let url = API_CONSTANTS.resourceGroupList
    return this.apiService
      .getDataWithParamValue(url,params)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createResourceGroup(payload:any): Observable<any> {
    let url = API_CONSTANTS.addResourceGroup
    return this.apiService
      .postData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateResourceGroup(resourceGroupId:any,payload:any): Observable<any> {
    let url = API_CONSTANTS.updateResourceGroup.replace('{resourceGroupId}', resourceGroupId)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteResourceGroup(resourceGroupId:any,payload:any): Observable<any> {
    let url = API_CONSTANTS.deleteResourceGroup.replace('{resourceGroupId}',resourceGroupId)
    return this.apiService
      .deleteData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
