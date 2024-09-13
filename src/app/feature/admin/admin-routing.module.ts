import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path :'admin-home', loadChildren : () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path :'admin-company', loadChildren : () => import('./companies/companies.module').then(m => m.CompaniesModule)
  },
  {
    path :'admin-user', loadChildren : () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path :'admin-device', loadChildren : () => import('./device/device.module').then(m => m.DeviceModule)
  },
  {
    path :'admin-sim', loadChildren : () => import('./sims/sims.module').then(m => m.SimsModule)
  },
  {
    path :'admin-sms', loadChildren : () => import('./sms/sms.module').then(m => m.SmsModule)
  },
  {
    path :'admin-email', loadChildren : () => import('./emails/emails.module').then(m => m.EmailsModule)
  },
  {
    path :'admin-reseller', loadChildren : () => import('./resellers/resellers.module').then(m => m.ResellersModule)
  },
  {
    path :'admin-masters', loadChildren : () => import('./master/master.module').then(m => m.MasterModule)
  },
  {
    path :'admin-more', loadChildren : () => import('./more/more.module').then(m => m.MoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
