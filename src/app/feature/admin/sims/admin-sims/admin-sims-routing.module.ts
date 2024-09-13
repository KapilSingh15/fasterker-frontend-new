import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSimsComponent } from './pages/manage-sims/manage-sims.component';

const routes: Routes = [
  {
    path: 'admin-sim-master', component: ManageSimsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSimsRoutingModule { }
