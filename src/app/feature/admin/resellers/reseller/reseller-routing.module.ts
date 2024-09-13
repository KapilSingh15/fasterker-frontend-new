import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagesResellerComponent } from './pages/manages-reseller/manages-reseller.component';

const routes: Routes = [
  {path : 'admin-reseller-master', component: ManagesResellerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResellerRoutingModule { }
