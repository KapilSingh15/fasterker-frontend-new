import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDeviceRoutingModule } from './admin-device-routing.module';
import { DeviceMasterComponent } from './pages/device-master/device-master.component';
import { AdminDeviceListComponent } from './component/admin-device-list/admin-device-list.component';
import { AdminDeviceFilterComponent } from './component/admin-device-filter/admin-device-filter.component';
import { CreateDeviceComponent } from './component/create-device/create-device.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableModule } from 'ngx-easy-table';


@NgModule({
  declarations: [
    DeviceMasterComponent,
    AdminDeviceListComponent,
    CreateDeviceComponent,
    AdminDeviceFilterComponent
  ],
  imports: [
    CommonModule,
    AdminDeviceRoutingModule,
    SharedModule,
    NgxPaginationModule,
    TableModule
  ]
})
export class AdminDeviceModule { }
