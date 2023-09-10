import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ERolesToString } from '../shared/ValueObjects/roles';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
    apiUrl = 'https://localhost:7199/api/v1/UserManagment';
    persons: any[] = []; // Array to store fetched data
    isLoading = false;

    constructor(
        private http: HttpClient,
        public cookieService: CookieService,
        private router: Router
    ) {}

    ngOnInit() {
        // Fetch data when the component is created
        this.fetchPersonList();
    }

    redirectToRegisterPerson() {
        this.router.navigate(['/dashboard-person/register']);
      } 

    // desativarClicked(personName: string) {
    //   // Assuming you have a function to deactivate the person here
    //   // You can replace this with your actual logic

    //   // Display a success message
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: 'Desativar',
    //     detail: `${personName} has been deactivated successfully.`,
    //   });
    // }
    fetchDisablePerson(personId: string) {
        this.isLoading = true;
        const accessToken = this.cookieService.get('token');
        this.http
            .put(`${this.apiUrl}/Deactivate?personId=${personId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    accept: 'application/json',
                },
            })
            .subscribe(
                (data: any) => {
                    this.isLoading = false;
                    this.persons = data;
                    // this.persons ={...this.persons}
                },
                (error) => {
                    this.isLoading = false;
                    console.error('Error fetching data', error);
                }
             );
    }

    fetchPersonList() {
        const accessToken = this.cookieService.get('token');
        this.http
            .get(`${this.apiUrl}/PersonList`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    accept: 'application/json',
                },
            })
            .subscribe(
                (data: any) => {
                    this.persons = data;
                    // this.persons ={...this.persons}
                },
                (error) => {
                    console.error('Error fetching data', error);
                }
            );
    }
}
