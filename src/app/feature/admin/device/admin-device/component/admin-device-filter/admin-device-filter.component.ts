import { Component, Output } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateDeviceComponent } from '../create-device/create-device.component';

@Component({
  selector: 'admin-device-filter',
  templateUrl: './admin-device-filter.component.html',
  styleUrl: './admin-device-filter.component.scss'
})
export class AdminDeviceFilterComponent {
  config = {
    displayKey: "description",
    search: true,
    placeholder: 'Select '
  };

  options = [
    {
      id: 'CompanyName',
      description: 'Company Name',
    },
    {
      id: 'UserName',
      description: 'Username',
    },
    {
      id: 'VehicleNo',
      description: 'Vehicle No',
    },
    {
      id: 'VehicleType',
      description: 'Vehicle Type',
    },
    {
      id: 'DeviceType',
      description: 'Device Type',
    },
  ];
  config1 = {
    displayKey: 'description',
    search: true,
    placeholder: `Select By`,
  };
  selectsearch = [
    {
      id: '1',
      description: 'Active',
    },
    {
      id: '0',
      description: 'Inactive',
    },
  ];

  bsModalRef!: BsModalRef

  constructor(
    private modalService : BsModalService
  ) {}

  onAddDevice(){
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      CreateDeviceComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered alert-popup" })
    );
  }

  onSearchBY(event: any): void {
    const value = event?.value?.id;
  }
}
