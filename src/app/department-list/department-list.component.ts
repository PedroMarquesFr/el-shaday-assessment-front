import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ERolesToString } from '../shared/ValueObjects/roles';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent {
  apiUrl = 'https://localhost:7135/api/v1/Department';
  departments: any[] = []; // Array to store fetched data
  isLoading = false;
  roles = {
      1: 'User',
      2: 'Admin',
  };
  types = {
      1: 'Fisica',
      2: 'Juridica',
  };
  qualifications = {
      1: 'Cliente',
      2: 'Fornecedor',
      3: 'Colaborador',
  };


  constructor(
      private http: HttpClient,
      public cookieService: CookieService,
      private router: Router
  ) {}

  ngOnInit() {
      // Fetch data when the component is created
      this.fetchDepartmentList();
  }

  redirectToRegisterPerson() {
      this.router.navigate(['/dashboard-person/register']);
  }

  fetchDepartmentList() {
      const accessToken = this.cookieService.get('token');
      this.http
          .get(`${this.apiUrl}/GetAllDepartments`, {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  accept: 'application/json',
              },
          })
          .subscribe(
              (data: any) => {
                  console.log(data);
                  this.departments = data;
                  // this.persons ={...this.persons}
              },
              (error) => {
                  console.error('Error fetching data', error);
              }
          );
  }
}
