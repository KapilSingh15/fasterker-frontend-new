import { Component } from '@angular/core';

@Component({
  selector: 'email-list',
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.scss'
})
export class EmailListComponent {
  coloums : any
  constructor(
  ) {}

  ngOnInit() {
    this.setInitialValue()
  }

  setInitialValue() {
    this.coloums = [
      { key: 'Subject', title: 'Subject' },
      { key: 'Body', title: 'Body' },
      { key: 'Status', title: 'Status' },
      { key: 'Company', title: 'Company' },
      { key: 'Created At', title: 'Created At' }
    ]
  }
}
