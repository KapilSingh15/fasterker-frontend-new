import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-admin-user',
  templateUrl: './create-admin-user.component.html',
  styleUrl: './create-admin-user.component.scss'
})
export class CreateAdminUserComponent {
  config = {
    displayKey: "description",
    search: true
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

  constructor(
    private bsModelService : BsModalService
  ) {}

  close() {
    this.bsModelService.hide()
  }
}
