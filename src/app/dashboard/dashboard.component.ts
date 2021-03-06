import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  postFormFlag: boolean;

  constructor(private authenService: AuthenticationService) {
    this.authenService.currentUser = true;
   }

  ngOnInit() {
    this.postFormFlag = true;

  }
}
