import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  title: string;
  link: string;

  constructor(
    public _userService: UserService
  ) { 
    this.title = this._userService.titleDasboard;
    this.link = this._userService.linkDashboard;

    console.log(this.title);
    console.log(this.link)
  }

  ngOnInit() {
  }

}
