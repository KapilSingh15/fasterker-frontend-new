import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMasterRoutingModule } from './admin-master-routing.module';
import { RoleMasterComponent } from './pages/role-master/pages/role-master/role-master.component';
import { ResourseMasterComponent } from './pages/resourse-master/pages/resourse-master/resourse-master.component';
import { ResourseGroupComponent } from './pages/resourse-group/pages/resourse-group/resourse-group.component';
import { ResoursePermissionComponent } from './pages/resourse-permission/pages/resourse-permission/resourse-permission.component';
import { CompanyMasterComponent } from './pages/company-master/pages/company-master/company-master.component';
import { UserMasterComponent } from './pages/user-master/pages/user-master/user-master.component';
import { AdminRoleListComponent } from './pages/role-master/component/admin-role-list/admin-role-list.component';
import { ResourceGroupListComponent } from './pages/resourse-group/component/resource-group-list/resource-group-list.component';
import { ResouceManagementListComponent } from './pages/resourse-master/component/resouce-management-list/resouce-management-list.component';
import { ResourcePermissionListComponent } from './pages/resourse-permission/component/resource-permission-list/resource-permission-list.component';
import { RoleCreateComponent } from './pages/role-master/component/role-create/role-create.component';
import { SharedModule } from '../../../shared/shared.module';
import { ResourceGroupCreateComponent } from './pages/resourse-group/component/resource-group-create/resource-group-create.component';
import { CreateResourceManagementComponent } from './pages/resourse-master/component/create-resource-management/create-resource-management.component';
import { CreateResourcePermissionComponent } from './pages/resourse-permission/component/create-resource-permission/create-resource-permission.component';
import { CompanyMasterListComponent } from './pages/company-master/components/company-master-list/company-master-list.component';
import { CreateCompanyMasterComponent } from './pages/company-master/components/create-company-master/create-company-master.component';
import { CompanyMasterDetailsComponent } from './pages/company-master/components/company-master-details/company-master-details.component';
import { CompanyMasterChildComponent } from './pages/company-master/components/company-master-child/company-master-child.component';
import { CompanyMasterFiltterComponent } from './pages/company-master/components/company-master-filtter/company-master-filtter.component';
import { UserMasterListComponent } from './pages/user-master/components/user-master-list/user-master-list.component';
import { UserMasterFilterComponent } from './pages/user-master/components/user-master-filter/user-master-filter.component';
import { CreateUserMasterComponent } from './pages/user-master/components/create-user-master/create-user-master.component';
import { VehicleMasterComponent } from './pages/vehicle-master/pages/vehicle-master/vehicle-master.component';
import { CreateVehicleMasterComponent } from './pages/vehicle-master/components/create-vehicle-master/create-vehicle-master.component';
import { VehicleMasterListComponent } from './pages/vehicle-master/components/vehicle-master-list/vehicle-master-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableModule } from 'ngx-easy-table';



@NgModule({
  declarations: [
    RoleMasterComponent,
    ResourseMasterComponent,
    ResourseGroupComponent,
    ResoursePermissionComponent,
    CompanyMasterComponent,
    UserMasterComponent,
    AdminRoleListComponent,
    ResourceGroupListComponent,
    ResouceManagementListComponent,
    ResourcePermissionListComponent,
    RoleCreateComponent,
    ResourceGroupCreateComponent,
    CreateResourceManagementComponent,
    CreateResourcePermissionComponent,
    CompanyMasterListComponent,
    CreateCompanyMasterComponent,
    CompanyMasterDetailsComponent,
    CompanyMasterChildComponent,
    CompanyMasterFiltterComponent,
    UserMasterListComponent,
    UserMasterFilterComponent,
    CreateUserMasterComponent,
    VehicleMasterComponent,
    CreateVehicleMasterComponent,
    VehicleMasterListComponent
  ],
  imports: [
    CommonModule,
    AdminMasterRoutingModule,
    SharedModule,
    NgxPaginationModule,
    TableModule
  ]
})
export class AdminMasterModule { }
