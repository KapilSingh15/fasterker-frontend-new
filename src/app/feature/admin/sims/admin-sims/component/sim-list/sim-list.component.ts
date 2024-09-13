import { Component } from '@angular/core';

@Component({
  selector: 'sim-list',
  templateUrl: './sim-list.component.html',
  styleUrl: './sim-list.component.scss'
})
export class SimListComponent {

  columns:any;

  ngOnInit() {
    this.setInitialtable()
  }

  setInitialtable() {
    this.columns = [
      { key: 'SNo', title: 'SNo' },
      { key: 'Mobile No', title: 'Mobile No' },
      { key: 'Sim No', title: 'Sim No' },
      { key: 'Network', title: 'Network' },
      { key: 'Allocation Date', title: 'Allocation Date' },
      { key: 'Billed Upto', title: 'Billed Upto' },
      { key: 'IMEI', title: 'IMEI' },
      { key: 'Last Connection', title: 'Last Connection' },
      { key: 'C. Sim', title: 'C. Sim' },
      { key: 'Action', title: 'Action' },

    ]
  }
}
