import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  name: string = "";
  role: string = "";
  navItems: any = [];
  userData: any;
  ngOnInit(): void {
    var userDataString = localStorage.getItem("user");
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      this.name = this.userData.name;
      this.role = this.userData.userRole.role_desc;
    }
    console.log(this.userData);
  }
  allowedUserClass(data: any[]) {
    if (data.includes(this.userData.role)) return true;
    else return false;
  }

}
