import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PersonRegistrationComponent } from 'src/app/person-registration/person-registration.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'register', component: PersonRegistrationComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
