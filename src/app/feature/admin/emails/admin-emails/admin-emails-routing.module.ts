import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailMasterComponent } from './pages/email-master/email-master.component';

const routes: Routes = [
  {
    path: 'admin-email-master', component : EmailMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEmailsRoutingModule { }
