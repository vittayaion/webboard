import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../authentication.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenService: AuthenticationService) { 

  console.log(this.authenService.currentUser);
  
  }

  ngOnInit() {
  }

  logout() {
    this.authenService.doLogout();
  }

}
