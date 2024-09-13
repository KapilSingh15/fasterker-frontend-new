import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-company-master',
  templateUrl: './create-company-master.component.html',
  styleUrl: './create-company-master.component.scss'
})
export class CreateCompanyMasterComponent {
  editData: any;
  constructor(
    private bsModelService :  BsModalService
  ) {}


  close(){
    this.bsModelService.hide()
  }
}
