import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/comment.service';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: any;
  uid: any;
  paramId = this.router.snapshot.params.id;
  allData = [];

  newData = [];
  constructor(private commentService: CommentService, private router: ActivatedRoute) {
    this.uid = firebase.auth().currentUser.uid;
    console.log('parammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',this.paramId);
    
  }

  postFormFlag: boolean;
  result: any;

  ngOnInit() {
    this.getComments();
    // this.getData();
  }

  deleteComment(index: any) {
    this.commentService.deleteComment(this.comments[index]['key']).catch(err => console.log(err));
  }

  // CRUD
  getData() {
    this.commentService.getCommentList().snapshotChanges().subscribe(res => {
      this.newData = [];
      res.forEach(i => {
        this.newData.push({
          key: i.payload.doc.id,
          post_id: i.payload.doc.data().post_id,
          comment_text: i.payload.doc.data().comment_text,
          timestamp:i.payload.doc.data().timestamp,
          owner: i.payload.doc.data().owner
        });
        console.log('newData ===> ', this.newData);
        return this.newData;
      });
    });
  }

  getComments() {
    // this.commentService.dataModel();
    console.log('DataModel from newGetComment ==> ', this.getData());
    
  }

  getCommentList() {
    this.commentService.getCommentList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(comment => {
      this.comments = comment;
      // console.log(this.comments);
      if (this.comments) {
        for (let i in this.comments) {
          let data = {
            key: i,
            value: this.comments[i]
          }
          this.allData.push(data.value);


          // console.log('data.value in allData ==> ',this.allData);  
        }
        console.log('allData', this.allData);
        
        // if (this.paramId === data.value.post_id) {
        //   let res = data.value;
        //   console.log('sssssssssssssssss',res);

        //   this.allData.push(res);
        //   console.log('0000',this.allData);
        // }
      }
    })
  }



}
