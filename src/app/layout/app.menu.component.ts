import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard-person/'] }
                ]
            },
            {
                label: 'Actions',
                items: [
                    { label: 'Register Person', icon: 'pi pi-fw pi-id-card', routerLink: ['dashboard-person/register'] },
                    // { label: 'Register Department', icon: 'pi pi-fw pi-check-square', routerLink: ['dashboard-person/register-department'] },
                ]
            },
        ];
    }
}
