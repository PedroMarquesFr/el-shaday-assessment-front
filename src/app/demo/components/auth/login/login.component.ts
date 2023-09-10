import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    error: string = '';
  
    constructor(public layoutService: LayoutService, private http: HttpClient, private cookieService: CookieService, private router: Router) {}
  
    login() {
        console.log(this.email, this.password)
      const loginData = {
        Email: this.email,
        Password: this.password
      };
  
      this.http.post('https://localhost:7199/api/v1/UserManagment/Login', loginData)
      .pipe(
        catchError((error: any) => {
          // Handle the error here
          console.error('Error:', error);
          this.error = 'Login failed. Please check your credentials and try again.';
          return throwError(error);
        })
      )
      .subscribe((token: any) => {
        this.error = '';
        this.cookieService.set('token', token);
        this.router.navigate(['/dashboard-person/']);
      });
    }
}
