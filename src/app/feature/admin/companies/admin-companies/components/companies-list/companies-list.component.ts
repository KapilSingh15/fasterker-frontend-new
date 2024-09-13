import { Component } from '@angular/core';
import { BreadcrumbItems } from '../../../../../shared/interfaces/breadcrumb-items';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.scss'
})
export class CompaniesListComponent {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: "Home",
      path: "/admin/admin-home/admin-dashboard",
      active: false,
    },

    {
      name: "Coparison Chart",
      path: "",
      active: true,
    },
  ];
  columns: any;

  constructor(){}

  ngOnInit() {
    this.setInitialtable()
  }

  setInitialtable() {
    this.columns = [
      { key: 'Status', title: 'Status' },
      { key: 'Name', title: 'Name' },
      { key: 'Email', title: 'Email' },
      { key: 'Mobile No.', title: 'Mobile No.' },
      // { key: 'Emergency', title: 'Emergency' },
      { key: 'Address', title: 'Address' },
      { key: 'Plan', title: 'Plan' },
      // { key: 'Contact Person', title: 'Contact Person' },
      // { key: 'Remarks', title: 'Remarks' },
      { key: 'Created Date', title: 'Created Date' },
      { key: 'Action', title: 'Action' },

    ]
  }
}
