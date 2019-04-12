import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
;

@Injectable({
  providedIn: 'root'
})
export class AddproductGuard implements CanActivate {
  constructor(private as: AuthService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.as.user) {
      return true;
    } else {
      this.router.navigate([`/login`]);
      return false;
    }
  }
}
