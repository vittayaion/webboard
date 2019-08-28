import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: any;
  uid: string;
  email: string;
  name:any;
  lastname: any;
  
  constructor(private userService:UserService) { 

    this.uid = firebase.auth().currentUser.uid;
    this.email = firebase.auth().currentUser.email;
    this.getUserList();
  }

  ngOnInit() {
  }

  getUserList() {
    this.userService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(user => {
      this.users = user;
      console.log('userprofile.................',this.users);
      for (let i in this.users) {
        console.log('auth_uid',this.users[i].auth_uid,'uid', this.uid);
        
        if (this.users[i].auth_uid == this.uid) {
          this.name = this.users[i].name;
          this.lastname = this.users[i].lastname;
          console.log(this.name);
        }
      }

      
    });
  }
}
