import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminDashboardStatusComponent } from './component/admin-dashboard-status/admin-dashboard-status.component';
import { AdminBalanceDetailsComponent } from './component/admin-balance-details/admin-balance-details.component';
import { AdminTransactionHistoryComponent } from './component/admin-transaction-history/admin-transaction-history.component';
import { AdminUpcomingPaymentComponent } from './component/admin-upcoming-payment/admin-upcoming-payment.component';
import { SharedModule } from '../../../shared/shared.module';
import { ModelWiseDeviceComponent } from './component/model-wise-device/model-wise-device.component';
import { StatusWiseDeviceComponent } from './component/status-wise-device/status-wise-device.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminDashboardStatusComponent,
    AdminBalanceDetailsComponent,
    AdminTransactionHistoryComponent,
    AdminUpcomingPaymentComponent,
    ModelWiseDeviceComponent,
    StatusWiseDeviceComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule
  ]
})
export class AdminDashboardModule { }
