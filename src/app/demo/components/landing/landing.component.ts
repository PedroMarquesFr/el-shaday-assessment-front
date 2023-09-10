import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent {

    constructor(public layoutService: LayoutService, public router: Router, public cookieService: CookieService) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Check if the user is authenticated, e.g., by verifying the presence of a token
      const isAuthenticated = this.cookieService.get('token'); // Your authentication check
  
      if (isAuthenticated) {
        return true;
      } else {
        // Redirect to the login page
        this.router.navigate(['/login']);
        return false;
      }
    }
}
