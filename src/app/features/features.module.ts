import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AssignmentModule } from './assignment/assignment.module';
import { AttendenceComponent } from './attendence/attendence.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeesComponent } from './fees/fees.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RaiseATicketComponent } from './raise-a-ticket/raise-a-ticket.component';
import { ReportsComponent } from './reports/reports.component';
import { SchoolComponent } from './school/school.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    SchoolComponent,
    CurriculumComponent,
    NotificationsComponent,
    FeesComponent,
    RaiseATicketComponent,
    AttendenceComponent,
    LoginComponent,
    ReportsComponent
  ],
  imports: [CommonModule, FeaturesRoutingModule, AssignmentModule, SharedModule]

})
export class FeaturesModule {}
