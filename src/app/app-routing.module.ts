import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './feature/shared/layout/main-layout/main-layout.component';
import { LoginComponent } from './feature/shared/login/login/login.component';

const routes: Routes = [
  {
    path : '', component: LoginComponent 
  },
  {
    path: "admin",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./feature/admin/admin.module").then(
        (m) => m.AdminModule
      ),
  },

  {
    path: 'user',
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./feature/user/user.module").then(
        (m) => m.UserModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
