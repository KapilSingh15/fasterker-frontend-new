import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.Constants';
import { ApiService } from '../../../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private apiService: ApiService
  ) { }

  customerDevice(params:any): Observable<any> {
    let url = API_CONSTANTS.customerDevice
    return this.apiService
      .getDataWithParamValue(url,params)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


  addCustomerDevice(payload: any): Observable<any> {
    let url = API_CONSTANTS.addCustomerDevice;
    return this.apiService
      .postData(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateDevice(deviceId:any, payload:any) : Observable<any> {
    let url = API_CONSTANTS.updateDevice.replace('{deviceId}', deviceId)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
    
  }

  deleteDevice(deviceId:any,payload:any): Observable<any> {
    let url = API_CONSTANTS.deleteDevice.replace('{deviceId}',deviceId)
    return this.apiService
      .deleteData(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
