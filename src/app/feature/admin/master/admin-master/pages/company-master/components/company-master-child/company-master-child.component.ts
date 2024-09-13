import { Component } from '@angular/core';

@Component({
  selector: 'app-company-master-child',
  templateUrl: './company-master-child.component.html',
  styleUrl: './company-master-child.component.scss'
})
export class CompanyMasterChildComponent {
  config = {
    displayKey: "description",
    search: true
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
