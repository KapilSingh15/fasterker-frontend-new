import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateUserMasterComponent } from '../create-user-master/create-user-master.component';

@Component({
  selector: 'user-master-filter',
  templateUrl: './user-master-filter.component.html',
  styleUrl: './user-master-filter.component.scss'
})
export class UserMasterFilterComponent {
  config1 = {
    displayKey: "description", 
    search: true,
    placeholder: 'Select Comapny'
  };
  config2 = {
    displayKey: "description", 
    search: true,
    placeholder: 'Select Manger'
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
    private modalService: BsModalService
  ) {}


  onAddUser() {   
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      CreateUserMasterComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
  }

}
