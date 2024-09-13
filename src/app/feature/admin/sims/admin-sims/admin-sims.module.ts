import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSimsRoutingModule } from './admin-sims-routing.module';
import { ManageSimsComponent } from './pages/manage-sims/manage-sims.component';
import { SimListComponent } from './component/sim-list/sim-list.component';
import { CreateSimComponent } from './component/create-sim/create-sim.component';
import { SimFilterComponent } from './component/sim-filter/sim-filter.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ManageSimsComponent,
    SimListComponent,
    CreateSimComponent,
    SimFilterComponent
  ],
  imports: [
    CommonModule,
    AdminSimsRoutingModule,
    SharedModule
  ]
})
export class AdminSimsModule { }
