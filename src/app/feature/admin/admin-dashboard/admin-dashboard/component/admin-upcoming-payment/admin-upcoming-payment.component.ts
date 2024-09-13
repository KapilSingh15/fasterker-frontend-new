import { Component } from '@angular/core';

@Component({
  selector: 'admin-upcoming-payment',
  templateUrl: './admin-upcoming-payment.component.html',
  styleUrl: './admin-upcoming-payment.component.scss'
})
export class AdminUpcomingPaymentComponent {
  columns:any
  ngOnInit() {
    this.setInitialtable()
  }

  setInitialtable() {
    this.columns = [
      { key: 'Payment Category', title: 'Payment Category' },
      { key: 'Date', title: 'Date' },
      { key: 'Amount', title: 'Amount' },


    ]
  }
}
