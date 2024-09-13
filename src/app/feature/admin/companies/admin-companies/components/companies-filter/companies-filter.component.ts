import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateCompaniesComponent } from '../create-companies/create-companies.component';

@Component({
  selector: 'app-companies-filter',
  templateUrl: './companies-filter.component.html',
  styleUrl: './companies-filter.component.scss'
})
export class CompaniesFilterComponent {
  bsModalRef!: BsModalRef;

  constructor(
    private modalService : BsModalService
  ) {}

  onAddCompanies() {   
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      CreateCompaniesComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
  }
}
