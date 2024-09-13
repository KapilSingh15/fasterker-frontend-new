import { Component } from '@angular/core';

@Component({
  selector: 'sms-list',
  templateUrl: './sms-list.component.html',
  styleUrl: './sms-list.component.scss'
})
export class SmsListComponent {
  columns:any;

  ngOnInit() {
    this.setInitialtable()
  }

  setInitialtable() {
    this.columns = [
      { key: 'SNo', title: 'SNo' },
      { key: 'Mobile No', title: 'Mobile No' },
      { key: 'text', title: 'text' },
      { key: 'Status', title: 'Status' },
      { key: 'Ref', title: 'Ref' },
      { key: 'Company', title: 'Company' },
      { key: 'Created At', title: 'Created At' }
    ]
  }
}
