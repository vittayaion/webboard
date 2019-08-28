import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  submitted = false;
  value: any[];
  errorMessage: string;
  successMessage: string;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router) {



  }

  authForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    auth_uid: ['']
  })

  ngOnInit() {
    console.log("Register Component Running...")
  }

  onSubmit() {

    // this.value = this.authForm.value;
    this.submitted = true;

    this.save();
  }

  save() {
    // let uid = firebase.auth().currentUser.uid
    // this.authForm.controls['auth_uid'].setValue(uid);

    this.authService.doRegister(this.authForm.value).then((res) => {
      console.log('log register', res);
    }).then(() => {
      this.userService.createUser(this.authForm.value);
      this.router.navigate(['dashboard']);
    })
    // console.log('new uid added = >', this.authForm.value);
    // await this.userService.createUser(this.authForm.value);
    // this.authForm.controls['auth_id'].setValue(this.uid);
  
    // this.user = new User();
  }

}
