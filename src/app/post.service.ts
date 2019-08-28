import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Post } from './post';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private dbPath = '/posts';
  object: any
  postRef: AngularFirestoreCollection<Post> = null;

  constructor(private db: AngularFirestore,
    private router:Router) {
    this.postRef = db.collection(this.dbPath);
  }

  createPost(post: Post): void {
    this.postRef.add({...post});
  }

  getSubpost(key: string){
    return this.db.collection('posts').doc(key).valueChanges();
  }

  getPostbyKey(key: string){

    return this.db.collection('posts').doc(key).valueChanges().subscribe(data => {
      this.object = data;
      console.log(this.object);
      this.router.navigate(["subpost", key]);
      return this.object;
    })
  }
 
  updatePost(key: string, value: any): Promise<void> {
    return this.postRef.doc(key).update(value);
  }
 
  deletePost(key: string): Promise<void> {
    return this.postRef.doc(key).delete();
  }
 
  getPostList(): AngularFirestoreCollection<Post> {
    return this.postRef;
  }

  // getPostByKey(index: string, key: string) {
  //   this.db.collection('',item => item.where(key, "==" , ['key'])).snapshotChanges().subscribe(a => 
  //     { 
  //       console.log(a);
  //     });
  // }

  deleteAll() {
    this.postRef.get().subscribe(
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