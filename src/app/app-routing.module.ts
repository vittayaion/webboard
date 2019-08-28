import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuardService } from './authentication-guard.service';
import { SubPostComponent } from './dashboard/sub-post/sub-post.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'homepage', component: HomepageComponent},
  { path:'signup', component: RegisterComponent},
  { path:'login', component: LoginComponent},
  { path:'profile', component: ProfileComponent,canActivate:[AuthenticationGuardService]},
  { path:'dashboard', component: DashboardComponent,canActivate:[AuthenticationGuardService]},
  { path:'subpost/:id', component: SubPostComponent,canActivate:[AuthenticationGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
