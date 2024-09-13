import { Component } from '@angular/core';

@Component({
  selector: 'admin-balance-details',
  templateUrl: './admin-balance-details.component.html',
  styleUrl: './admin-balance-details.component.scss'
})
export class AdminBalanceDetailsComponent {
  paymentImage =[
    {id:1,image:'assets/images/gpay.png'},
    {id:2,image:'assets/images/paytm.png'},
    {id:3,image:'assets/images/PhonePe.png'},
    {id:4,image:'assets/images/upi.jpg'},
  ]
}
