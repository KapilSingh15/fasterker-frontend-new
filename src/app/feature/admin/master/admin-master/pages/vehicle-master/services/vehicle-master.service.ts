import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../../../shared/constant/API.Constants';

@Injectable({
  providedIn: 'root'
})
export class VehicleMasterService {

  constructor(private apiService: ApiService) { }

  vehicleMasterList(params:any): Observable<any> {
    let url = API_CONSTANTS.vehicleList
    return this.apiService
      .getDataWithParamValue(url,params)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createVehicleMaster(payload:any): Observable<any> {
    let url = API_CONSTANTS.createVehicle
    return this.apiService
      .postData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateVehicle(vehicleId:any, payload:any) : Observable<any> {
    let url = API_CONSTANTS.updateVehicle.replace('{vehicleId}', vehicleId)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
    
  }

  deleteVehicleMaster(VehicleId:any,payload:any): Observable<any> {
    let url = API_CONSTANTS.deleteVehicle.replace('{VehicleId}',VehicleId)
    return this.apiService
      .deleteData(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
