import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from '../../../../http-services/api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  constructor(
    private apiService : ApiService,
    private http : HttpClient
  ) { }

  vehicleList(): Observable<any> {
    let url = 'https://itmparampara.co.in/api/VehicleList'
    return this.http
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
