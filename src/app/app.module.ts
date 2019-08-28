import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule,FirestoreSettingsToken } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './authentication.service';
import { PostComponent } from './dashboard/post/post.component';
import { CommentComponent } from './dashboard/comment/comment.component';
import { FormInputComponent } from './dashboard/form-input/form-input.component';
import { AuthenticationGuardService } from './authentication-guard.service';
import { SubPostComponent } from './dashboard/sub-post/sub-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    HomepageComponent,
    ProfileComponent,
    PostComponent,
    CommentComponent,
    FormInputComponent,
    SubPostComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthenticationService, AuthenticationGuardService ,{provide: FirestoreSettingsToken, useValue:{}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
