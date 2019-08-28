import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<firebase.User>;
  currentUser: boolean;
  errorMessage: string;
  successMessage: string;
  authForm: any;
  


  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private rt: Router) {
    this.user$ = afAuth.authState;
    this.currentUser = false;
    
  }
  
  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }


  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          console.log("Log-in success!");
          this.currentUser = true;
          this.rt.navigate(['dashboard']);
        }, err =>
            reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.currentUser = false;
        this.afAuth.auth.signOut();
        resolve();
        this.rt.navigate(['login']);
      }
      else {
        reject();
      }
    });
  }




}
