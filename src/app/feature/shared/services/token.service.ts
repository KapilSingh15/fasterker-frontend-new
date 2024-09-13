import { Injectable } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { LocalStorageService } from './localstorage.service';
import { JwtTokenService } from './jwt-token.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MenuService } from './menu.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private loginService: LoginServiceService,
    private localStorageService : LocalStorageService,
    private jwtService: JwtTokenService,
    private notificationService: NotificationService,
    private router : Router,
    private storageService: StorageService
  ) { }

  //**generate token and redirect to dashboard page and after decode save token in indexdb */
  generateToken(data: any) {
    let payload = {
      "userName": data.userName,
      "password": data.password
    };

    this.loginService.login(payload).subscribe((res: any) => {      
      const userDetail = res.body;
      if(userDetail?.success) {
        this.localStorageService.setItem("token", userDetail?.result?.access_token)
        let token = userDetail?.result.access_token
        const decodedToken = this.jwtService.decodeToken(token);        
        this.storageService.setItem('userDetail', decodedToken?.user)
        this.notificationService.showSuccess('Login Successfully');
        this.router.navigate(['/admin/admin-home/admin-dashboard']); 
        this.storageService.setItem('menus', userDetail?.result?.menus)
      } else {
        this.notificationService.showError(userDetail?.message)
      }
    });
  }

  //**gettoken from localstorage */
  getToken() {
    return this.localStorageService.getItem('token');
  }

  //**check condition for token available in localstorage */
  hasToken() {
    return this.localStorageService.getItem('token') !== null;
  }
}
