import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyMasterComponent } from './pages/company-master/pages/company-master/company-master.component';
import { ResourseGroupComponent } from './pages/resourse-group/pages/resourse-group/resourse-group.component';
import { ResourseMasterComponent } from './pages/resourse-master/pages/resourse-master/resourse-master.component';
import { ResoursePermissionComponent } from './pages/resourse-permission/pages/resourse-permission/resourse-permission.component';
import { RoleMasterComponent } from './pages/role-master/pages/role-master/role-master.component';
import { UserMasterComponent } from './pages/user-master/pages/user-master/user-master.component';
import { VehicleMasterComponent } from './pages/vehicle-master/pages/vehicle-master/vehicle-master.component';


const routes: Routes = [
  {
    path: 'admin-company-master', component : CompanyMasterComponent
  },
  {
    path: 'admin-resource-group', component : ResourseGroupComponent
  },
  {
    path: 'admin-resourse-master', component : ResourseMasterComponent
  },
  {
    path: 'admin-resource-permission', component : ResoursePermissionComponent
  },
  {
    path: 'admin-role-master', component : RoleMasterComponent
  },
  {
    path: 'admin-user-master', component : UserMasterComponent
  },
  {
    path: 'admin-vehicle-master', component : VehicleMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMasterRoutingModule { }
