import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCompaniesRoutingModule } from './admin-companies-routing.module';
import { CompanyMasterComponent } from './pages/company-master/company-master.component';
import { CompaniesFilterComponent } from './components/companies-filter/companies-filter.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateCompaniesComponent } from './components/create-companies/create-companies.component';
import { BasicDetailsCompaniesComponent } from './components/basic-details-companies/basic-details-companies.component';
import { ChildCompaniesComponent } from './components/child-companies/child-companies.component';


@NgModule({
  declarations: [
    CompanyMasterComponent,
    CompaniesFilterComponent,
    CompaniesListComponent,
    CreateCompaniesComponent,
    BasicDetailsCompaniesComponent,
    ChildCompaniesComponent
  ],
  imports: [
    CommonModule,
    AdminCompaniesRoutingModule,SharedModule,
    SharedModule
  ]
})
export class AdminCompaniesModule { }
