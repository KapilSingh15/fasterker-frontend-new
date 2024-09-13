import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyMasterComponent } from './pages/company-master/company-master.component';

const routes: Routes = [
  {
    path : 'admin-company-master' , component : CompanyMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCompaniesRoutingModule { }
