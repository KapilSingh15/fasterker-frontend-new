import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsMasterComponent } from './pages/sms-master/sms-master.component';

const routes: Routes = [
  {
    path: 'admin-sms-master', component: SmsMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSmsRoutingModule { }
