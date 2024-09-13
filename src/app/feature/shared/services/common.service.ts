import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { ApiService } from '../../http-services/api.service';
import { API_CONSTANTS } from '../constant/API.Constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   countryListCache$!: Observable<any>;
   stateListCache$!: Observable<any>;
   cityListCache$!: Observable<any>;
   companyListCache$!: Observable<any>;
   userListCache$!: Observable<any>
   resourceGroupListCache$!: Observable<any>


  constructor(
    private apiService : ApiService
  ) { }

  //**country list service here */
  countryList(): Observable<any> {
    let url = API_CONSTANTS.country

    if (!this.countryListCache$) {
      this.countryListCache$ = this.apiService.get(url).pipe(
        shareReplay(1),
        catchError((error: HttpErrorResponse) => of(error))
      );
    }
    return this.countryListCache$;
  }

  //**state list service here */
  stateList(countryID:any): Observable<any> {
    let url = API_CONSTANTS.state.replace("{countryID}", countryID)

      this.stateListCache$ = this.apiService.get(url).pipe(
        shareReplay(1),
        catchError((error: HttpErrorResponse) => of(error))
      );
    
    return this.stateListCache$;
  }


  cityList(countryID: any, stateID: any): Observable<any> {
    let url = API_CONSTANTS.city.replace("{countryID}", countryID).replace('{stateID}', stateID);

    this.cityListCache$ = this.apiService.get(url).pipe(
      shareReplay(1),
      catchError((error: HttpErrorResponse) => of(error))
    );
    
    return this.cityListCache$;
}


  //**company list service here */
  companyList(userID:any): Observable<any> {
    let url = API_CONSTANTS.company.replace("{userID}",userID)

    if (!this.companyListCache$) {
      this.companyListCache$ = this.apiService.get(url).pipe(
        shareReplay(1),
        catchError((error: HttpErrorResponse) => of(error))
      );
    }
    return this.companyListCache$;
  }

   //**Resource Group list service here */
   resourceGroupList(): Observable<any> {
    let url = API_CONSTANTS.resourceGroupList

    if (!this.resourceGroupListCache$) {
      this.resourceGroupListCache$ = this.apiService.get(url).pipe(
        shareReplay(1),
        catchError((error: HttpErrorResponse) => of(error))
      );
    }
    return this.resourceGroupListCache$;
  }

  //**company Dropdown service here */
  companyDropdownList(): Observable<any> {
    let url = API_CONSTANTS.companyDropdown
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

   //**Role Dropdown service here */
  roleDropdownList(): Observable<any> {
    let url = API_CONSTANTS.roleMasterDropdownList
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

   //**Parent Resource Dropdown service here */
  parentResourceDropdownList(): Observable<any> {
    let url = API_CONSTANTS.parentResourceDropdown
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

   //**Vehicle Type Dropdown service here */
   vehicleTypeDrropdown(): Observable<any> {
    let url = API_CONSTANTS.vehicleTypeDropdown
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

   //**Vehicle Type Dropdown service here */
   userDropdown(): Observable<any> {
    let url = API_CONSTANTS.userDropdown
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deviceType(): Observable<any> {
    let url = API_CONSTANTS.deviceType
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vehicleType(): Observable<any> {
    let url = API_CONSTANTS.vehicleType
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  locationDetails(): Observable<any> {
    let url = API_CONSTANTS.locationDetails
    return this.apiService
      .getData(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
