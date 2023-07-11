import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
authtate:boolean=false;
  constructor(private router: Router,
              private socialAuthService: SocialAuthService,
              private _authservice:AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean |UrlTree>  | Promise<boolean> | boolean {
if(this._authservice.Curentuser._value !=null || localStorage.getItem("oauthtoken") !=null)
{
  
  return true
}
else
{
  this.router.navigate(['login']);
  return false;

  // return this.socialAuthService.authState.pipe(
  //   map((socialUser: SocialUser) => !!socialUser),
  //   tap((isLoggedIn: boolean) => {
  //     if (!isLoggedIn) {
  //       this.router.navigate(['login']);
  //     }
  //   })
  // );
}
}   
    
}