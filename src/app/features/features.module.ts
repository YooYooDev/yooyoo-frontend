import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FilterService, GridModule, GroupService, PageService, SortService } from '@syncfusion/ej2-angular-grids';

import { SharedModule } from '../shared/shared.module';
import { AssignmentComponent } from './assignment/assignment.component';
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
    ReportsComponent,
    AssignmentComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    AssignmentModule,
    SharedModule,
    GridModule,
    HttpClientModule,
    FormsModule,
    RadioButtonModule,
    DatePickerModule
  ],
  exports: [GridModule],
  providers: [PageService, SortService, FilterService, GroupService]
})
export class FeaturesModule {}
