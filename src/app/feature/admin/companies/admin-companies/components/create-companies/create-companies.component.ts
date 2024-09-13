import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-companies',
  templateUrl: './create-companies.component.html',
  styleUrl: './create-companies.component.scss'
})
export class CreateCompaniesComponent {
  constructor(
    private bsModelService :  BsModalService
  ) {}


  close(){
    this.bsModelService.hide()
  }
}
