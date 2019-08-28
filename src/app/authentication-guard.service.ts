import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

  constructor(
    private authService: AuthenticationService, 
    private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
     return this.authService.user$.pipe(map(data => {
       if(data) return true;
 
       this.router.navigate(['/login'],{ queryParams:{returnUrl:state.url}});
       console.log(state.url);
       return false;
     }));
  }
}
