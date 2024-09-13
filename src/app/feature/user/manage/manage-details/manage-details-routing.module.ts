import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDeviceComponent } from './pages/my-device/my-device.component';

const routes: Routes = [
  {
    path: 'vehicles', component: MyDeviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDetailsRoutingModule { }
