import { Component } from '@angular/core';


@Component({
  selector: 'admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.scss'
})
export class AdminUserListComponent {
  columns:any;

  data:any = [
    {
      sno : 1,
      status: 'Active',
      name: 'Super Admin',
      company: 'MORYATRANS INDIA PRIVATE LIMITED',
      tz: "IST",
      loginId :'supergpsfast',
      password: '',
      mobileNo : 9912012959,
      role : 'User (Fleet Manager)',
      manager :'SOURABH',
      totalDevice:100,
      limit: "unlimited",
      lastLogin : '05-07-2024 12:05:41',
      app: 122

    }
  ];

  constructor(
  ) {}

  ngOnInit() {
    this.setInitialtable()
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.' },
      { key: 'Status', title: 'Status' },
      { key: 'Name', title: 'Name' },
      { key: 'Company', title: 'Company' },
      { key: 'TZ', title: 'TZ' },
      { key: 'Login Id', title: 'Login Id' },
      { key: 'Password', title: 'Password' },
      { key: 'Mobile No', title: 'Mobile No' },
      { key: 'Role', title: 'Role' },
      { key: 'Manager', title: 'Manager' },
      { key: 'Total Device', title: 'Total Device' },
      { key: 'Last Login', title: 'Last Login' },
      { key: 'Action', title: 'Action' },
    ]
  }

  

}
