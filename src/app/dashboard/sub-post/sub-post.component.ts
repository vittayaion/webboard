import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommentService } from 'src/app/comment.service';
import { formatDate } from '@angular/common';
import { PostService } from 'src/app/post.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sub-post',
  templateUrl: './sub-post.component.html',
  styleUrls: ['./sub-post.component.css']
})
export class SubPostComponent implements OnInit {

  // @Input();
  today = new Date();
  jstoday = '';
  uid: string;
  owner: any;
  constructor(private fb: FormBuilder,
    private commentService: CommentService,
    private router: ActivatedRoute,
    private postService: PostService) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0700');
    this.uid = firebase.auth().currentUser.uid;
    console.log(this.uid);
  }

  topicpost: any;
  textdetail: any;
  timestamp: any;
  comments: any;
  posts: any;
  keyparam: string;
  post_object: any;
  paramId: any[]

  commentForm = this.fb.group({
    comment_text: [''],
    owner: [''],
    timestamp: [''],
    post_id: ['']
  })

  ngOnInit() {
    const paramId = this.router.snapshot.params.id;
    console.log(paramId);

    this.router.params.subscribe(result => {
      const key = result['id'];
      this.keyparam = key;
      console.log(this.keyparam);
    });
    this.postService.getSubpost(this.keyparam).subscribe(result => {
      this.post_object = result;
      this.topicpost = this.post_object['topicpost'];
      this.textdetail = this.post_object['textdetail'];
      this.timestamp = this.post_object['timestamp'];
      this.owner = this.post_object['owner'];
      console.log(this.keyparam);
    });
  }

  createComment() {
    this.commentForm.controls['timestamp'].setValue(this.jstoday);
    this.commentForm.controls['post_id'].setValue(this.keyparam);
    this.commentForm.controls['owner'].setValue(this.uid);
    this.commentService.createComment(this.commentForm.value)
  }

  getComment() {
    this.commentService.getCommentList().valueChanges().subscribe(result => {
      console.log('Result in getComment ====> ', result);
      return this.comments = result;
    })
  }

  updateComment() {
    
  }

  deleteComment(index: string) {
    this.commentService.deleteComment(this.comments[index]['key']).catch(err => console.log(err));
  }

}
