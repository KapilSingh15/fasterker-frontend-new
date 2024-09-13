import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateCompaniesComponent } from '../../../../../../companies/admin-companies/components/create-companies/create-companies.component';
import { CreateCompanyMasterComponent } from '../create-company-master/create-company-master.component';

@Component({
  selector: 'app-company-master-filtter',
  templateUrl: './company-master-filtter.component.html',
  styleUrl: './company-master-filtter.component.scss'
})
export class CompanyMasterFiltterComponent {
  bsModalRef!: BsModalRef;

  constructor(
    private modalService : BsModalService
  ) {}

  onAddCompanies() {   
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      CreateCompanyMasterComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
  }
}
