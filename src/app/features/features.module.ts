import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {
  FilterService,
  GridModule,
  GroupService,
  PageService,
  SortService
} from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import { SharedModule } from '../shared/shared.module';
import { AssignmentComponent } from './assignment/assignment.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeesComponent } from './fees/fees.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
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
    AttendanceComponent,
    LoginComponent,
    ReportsComponent,
    AssignmentComponent,
    LogoutComponent,
    NumericTextBoxComponent,
    DropDownListComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    GridModule,
    HttpClientModule,
    FormsModule,
    RadioButtonModule,
    DatePickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    TextBoxModule
  ],
  exports: [GridModule],
  providers: [PageService, SortService, FilterService, GroupService]
})
export class FeaturesModule {}
