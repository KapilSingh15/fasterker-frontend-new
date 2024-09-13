import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateAdminUserComponent } from '../create-admin-user/create-admin-user.component';

@Component({
  selector: 'filter-admin-user',
  templateUrl: './filter-admin-user.component.html',
  styleUrl: './filter-admin-user.component.scss'
})
export class FilterAdminUserComponent {
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
      CreateAdminUserComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
  }

}
