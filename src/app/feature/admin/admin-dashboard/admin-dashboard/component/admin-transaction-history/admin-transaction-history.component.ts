import { Component } from '@angular/core';

@Component({
  selector: 'admin-transaction-history',
  templateUrl: './admin-transaction-history.component.html',
  styleUrl: './admin-transaction-history.component.scss'
})
export class AdminTransactionHistoryComponent {
  columns:any
  ngOnInit() {
    this.setInitialtable()
  }

  setInitialtable() {
    this.columns = [
      { key: 'Date', title: 'Date' },
      { key: 'Transaction', title: 'Transaction' },
      { key: 'Trans Type', title: 'Trans Type' },
      { key: 'Balance', title: 'Balance' },
      { key: 'Remarks', title: 'Remarks' },
      { key: 'Details', title: 'Details' },

    ]
  }

}
