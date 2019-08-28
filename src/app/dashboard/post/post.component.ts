import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { UserService } from 'src/app/user.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  Post: Post;
  post_id: any;
  topic_post: any;
  textdetail: any;
  posts: any;
  users: any;
  values = '';
  editted: boolean;
  opendEditor: boolean;

  today = new Date();
  jstoday = '';
  uid: any;
  owner: any;
  email: string;
  name: any;
  lastname: any;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0700');
    this.uid = firebase.auth().currentUser.uid;
    this.email = firebase.auth().currentUser.email;



  }

  postForm = this.fb.group({
    topicpost: ['', Validators.required],
    textdetail: [''],
    owner: [''],
    timestamp: ['']
  })

  @Output() topicpost = new EventEmitter<boolean>();

  EnableEditBtn(value: any) {
    if (value) {
      this.editted = true;
      this.post_id = this.posts[value]['key'];
    }
    // console.log("Open Input Field ! ");
  }

  ngOnInit() {
    
    this.getPostList();
    this.getUserList();
  

  }

  // getPostbyKey(index: string, key: string) {
  //   let a = this.posts[index]['topicpost'];
  //   // console.log(a);
  //   this.router.navigate(["subpost", key]);
  // }

  createPost() {
    // save
    // this.postForm.controls['owner'].setValue()
    this.postForm.controls['timestamp'].setValue(this.jstoday);
    this.postForm.controls['owner'].setValue(this.uid);
    this.postService.createPost(this.postForm.value);
  }

  getPostList() {
    this.postService.getPostList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(post => {
      this.posts = post;
      console.log('posts ===> ', this.posts);
      this.owner = [];
      for (let i in this.posts) {
        this.owner = this.posts[i].owner;
        (this.owner[i] = this.posts[i].owner)
      }
      console.log('Owner of getPostList ====> ', this.owner);
      return this.owner;
    });

  }



  deleteAllPost() {
    this.postService.deleteAll();
  }

  deletePost(index: any) {
    this.postService.deletePost(this.posts[index]['key']).catch(err => console.log(err));
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


      console.log('userprofile.................', this.users);
      for (let i in this.users) {
      // console.log('auth_uid',this.users[i].auth_uid,'owner', this.owner);
        console.log(this.owner);
        



        if (this.users[i].auth_uid == this.owner) {
          this.name = this.users[i].name;
          this.lastname = this.users[i].lastname;
          console.log(this.name);
        }
      }


    });
  }


  save(index: string, data: any) {
    console.log("called save", this.editted);
    this.postForm.controls['owner'].setValue(this.uid);
    this.postService.updatePost(this.posts[index]['key'], this.postForm.value).catch(err => console.log(err));
    this.editted = false;
    // this.Post = new Post();
  }
}
