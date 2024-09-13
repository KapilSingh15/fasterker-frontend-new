import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { UserMasterComponent } from './pages/user-master/user-master.component';
import { AdminUserListComponent } from './component/admin-user-list/admin-user-list.component';
import { CreateAdminUserComponent } from './component/create-admin-user/create-admin-user.component';
import { FilterAdminUserComponent } from './component/filter-admin-user/filter-admin-user.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    UserMasterComponent,
    AdminUserListComponent,
    CreateAdminUserComponent,
    FilterAdminUserComponent
  ],
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    SharedModule
  ]
})
export class AdminUsersModule { }
