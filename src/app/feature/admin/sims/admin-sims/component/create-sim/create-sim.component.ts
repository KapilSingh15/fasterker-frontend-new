import { Component } from '@angular/core';

@Component({
  selector: 'app-create-sim',
  templateUrl: './create-sim.component.html',
  styleUrl: './create-sim.component.scss'
})
export class CreateSimComponent {
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
