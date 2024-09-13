import { Component } from '@angular/core';

@Component({
  selector: 'sms-filter',
  templateUrl: './sms-filter.component.html',
  styleUrl: './sms-filter.component.scss'
})
export class SmsFilterComponent {
  config = {
    displayKey: "description",
    search: true,
    placeholder: 'Select Company'
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
}
