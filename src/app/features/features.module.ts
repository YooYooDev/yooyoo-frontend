import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { SchoolComponent } from './school/school.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FeesComponent } from './fees/fees.component';
import { RaiseATicketComponent } from './raise-a-ticket/raise-a-ticket.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    AssignmentComponent,
    SchoolComponent,
    CurriculumComponent,
    NotificationsComponent,
    FeesComponent,
    RaiseATicketComponent,
    AttendenceComponent,
    LoginComponent,
    ReportsComponent
  ],
  imports: [CommonModule, FeaturesRoutingModule]
})
export class FeaturesModule {}
