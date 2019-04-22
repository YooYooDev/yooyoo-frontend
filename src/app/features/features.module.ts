import { DialogViewComponent } from './assignment/dialog-view.component';
import { CommonModule } from '@angular/common';
import {
  AutoCompleteModule,
  DropDownListModule,
  MultiSelectModule
} from '@syncfusion/ej2-angular-dropdowns';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  RadioButtonModule,
  SwitchModule
} from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import {
  MaskedTextBoxModule,
  NumericTextBoxModule,
  TextBoxModule,
  UploaderModule
} from '@syncfusion/ej2-angular-inputs';
import {
  FilterService,
  GridModule,
  GroupService,
  PageService,
  SortService
} from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { HttpClientModule } from '@angular/common/http';
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
import { CredManagerComponent } from './users/cred-manager/cred-manager.component';
import { SettingsComponent } from './curriculum/settings/settings.component';
import { AssignmentSchoolComponent } from './assignment-school/assignment-school.component';
import { QuizComponent } from './curriculum/quiz/quiz.component';
import { TopicComponent } from './curriculum/topics/topic.component';
import { AttendanceReportComponent } from './reports/attendance-report/attendance-report.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
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
    AssignmentSchoolComponent,
    LogoutComponent,
    CredManagerComponent,
    SettingsComponent,
    QuizComponent,
    TopicComponent,
    DialogViewComponent,
    AttendanceReportComponent
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
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule,
    TextBoxModule,
    MatButtonModule,
    SwitchModule,
    UploaderModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    DropDownListModule,
    DialogModule,
    NumericTextBoxModule,
    MaskedTextBoxModule,
    AutoCompleteModule,
    MultiSelectModule,
    ListViewModule,
    AccumulationChartAllModule,
    DateRangePickerModule
  ],
  exports: [GridModule, DialogViewComponent],
  providers: [PageService, SortService, FilterService, GroupService]
})
export class FeaturesModule {}
