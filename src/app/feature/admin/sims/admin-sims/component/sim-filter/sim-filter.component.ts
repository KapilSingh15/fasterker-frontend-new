import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateSimComponent } from '../create-sim/create-sim.component';

@Component({
  selector: 'sim-filter',
  templateUrl: './sim-filter.component.html',
  styleUrl: './sim-filter.component.scss'
})
export class SimFilterComponent {
  config = {
    displayKey: "description",
    search: true,
    placeholder: 'Use Status'
  };

  options = [
    {
      "id": 1,
      "description": "Option 1"
    },
    {
      "id": 2,
      "description": "Option 2"
    },
    {
      "id": 3,
      "description": "Option 3"
    }
  ];

  bsModalRef!: BsModalRef

  constructor(
    private modalService : BsModalService
  ) {}

  onAddSim(){
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      CreateSimComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
  }
}
