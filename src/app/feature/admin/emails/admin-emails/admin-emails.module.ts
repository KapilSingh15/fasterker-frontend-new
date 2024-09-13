import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEmailsRoutingModule } from './admin-emails-routing.module';
import { EmailMasterComponent } from './pages/email-master/email-master.component';
import { EmailListComponent } from './component/email-list/email-list.component';
import { EmailFilterComponent } from './component/email-filter/email-filter.component';


@NgModule({
  declarations: [
    EmailMasterComponent,
    EmailListComponent,
    EmailFilterComponent
  ],
  imports: [
    CommonModule,
    AdminEmailsRoutingModule
  ]
})
export class AdminEmailsModule { }
