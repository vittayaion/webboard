import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './user';
import * as firebase from 'firebase/app';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  userRef: AngularFirestoreCollection<User> = null;
  users: any;
  uid: string;
  name: any;
  lastname: any;

  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService) {
    this.userRef = db.collection(this.dbPath);
    this.uid = firebase.auth().currentUser.uid;
  }

  createUser(user: User): void {
    let createUser = firebase.auth().currentUser;
    console.log(createUser.uid);
    
    let data = {
      email: user.email,
      password:user.password,
      name: user.name,
      lastname: user.lastname,
      auth_uid: createUser.uid
    }
    this.userRef.add(data);
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.userRef.doc(key).update(value);
  }

  deleteUser(key: string): Promise<void> {
    return this.userRef.doc(key).delete();
  }

  getUsersList(): AngularFirestoreCollection<User> {
    return this.userRef;
  }



  deleteAll() {
    this.userRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      });
  }
}