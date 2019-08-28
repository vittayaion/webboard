import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';
import { formatDate } from '@angular/common';
import { User } from 'src/app/user';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {

  today = new Date();
  jstoday = '';

  post: Post = new Post();
  user: User = new User();

  postForm = this.fb.group({
    topicpost: ['', Validators.required],
    textdetail: [''],
    owner: [''],
    timestamp: ['']
  })

  constructor(private fb: FormBuilder,
    private postService: PostService,
    private afAuth: AngularFireAuth,
  ) { 
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0700'); 
  }

  ngOnInit() {
    let a = firebase.auth().currentUser.uid
    // console.log(a);
  }  

  save() {
    // this.postForm.controls['owner'].setValue()
    this.postForm.controls['timestamp'].setValue(this.jstoday);
    this.postService.createPost(this.postForm.value)
  }

}
