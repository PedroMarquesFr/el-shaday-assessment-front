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
    apiUrl = 'https://localhost:7135/api/v1/Person';
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

    redirectToEdit(id: string): void {
        // Navigate to the 'example' route with the 'id' parameter
        this.router.navigate(['/dashboard-person/edit', id]);
    }
    fetchDisablePerson(personId: string) {
        this.isLoading = true;
        const accessToken = this.cookieService.get('token');
        this.http
            .put(`${this.apiUrl}/Deactivate?personId=${personId}`, null, {
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
