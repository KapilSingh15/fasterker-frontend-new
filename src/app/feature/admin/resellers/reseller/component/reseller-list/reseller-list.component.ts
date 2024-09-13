import { Component } from '@angular/core';

@Component({
  selector: 'reseller-list',
  templateUrl: './reseller-list.component.html',
  styleUrl: './reseller-list.component.scss'
})
export class ResellerListComponent {
  coloums:any;

  ngOnInit() {
    this.setInitialValue()
  }
  
  setInitialValue() {
    this.coloums = [
      { key: 'S No.', title: 'S No.' },
      { key: 'Name', title: 'Name' },
      { key: 'Distributor', title: 'Distributor' },
      { key: 'Mobile No', title: 'Mobile No' },
      { key: 'Email', title: 'Email' },
      { key: 'Address', title: 'Address' },
      { key: 'Type', title: 'Type' },
      { key: 'Balance', title: 'Balance' },
      { key: 'Limit', title: 'Limit' },
      { key: 'Credits', title: 'Credits' },
      { key: 'Status', title: 'Status' },
      { key: 'Action', title: 'Action' },
    ]
  }
}
