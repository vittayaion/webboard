import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: [''],
  })

  constructor(
    public afAuth: AngularFireAuth , 
    private fb:FormBuilder,
    private router: Router,
    private authenService: AuthenticationService) { }

  ngOnInit() {
  }

  Login() {
    this.authenService.doLogin(this.loginForm.value);
    this.router.navigate['dashboard'];
  }
}
