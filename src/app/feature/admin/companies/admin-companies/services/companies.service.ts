import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from '../../../../http-services/api.service';
import { API_CONSTANTS } from '../../../../shared/constant/API.Constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private apiService: ApiService
  ) { }

  
}
