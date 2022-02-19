import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(route.url[0].path)
    var authenticated = this.authservice.refreshAccesToken();
    var subject = new Subject<boolean>();
    console.log("i am in path")
    authenticated.subscribe(
      (res) => {
        console.log("onNext guard: " + res);
        if (!res && state.url !== '/login') {
          localStorage.clear();
          console.log("redirecting to signin")
          this.router.navigate(['/login']);
        }
        subject.next(res.valueOf());
      });
    return subject.asObservable();
  }

}
