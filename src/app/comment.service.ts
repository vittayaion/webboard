import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Comment } from './comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private dbPath = '/comments';
 
  commentRef: AngularFirestoreCollection<Comment> = null;

  constructor(private db: AngularFirestore) {
    this.commentRef = db.collection(this.dbPath);
  }

  newData = [];

  createComment(comment: Comment): void {
    this.commentRef.add({...comment});
  }
 
  updateComment(key: string, value: any): Promise<void> {
    return this.commentRef.doc(key).update(value);
  }
 
  deleteComment(key: string): Promise<void> {
    return this.commentRef.doc(key).delete();
  }
 
  getCommentList(): AngularFirestoreCollection<Comment> {
    return this.commentRef;
  }
 
  deleteAll() {
    this.commentRef.get().subscribe(
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
