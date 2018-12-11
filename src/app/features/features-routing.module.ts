import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
// import { AssignmentComponent } from './assignment/assignment.component';
import { SchoolComponent } from './school/school.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { ReportsComponent } from './reports/reports.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FeesComponent } from './fees/fees.component';
import { RaiseATicketComponent } from './raise-a-ticket/raise-a-ticket.component';
import { AttendenceComponent } from './attendence/attendence.component';

const featuresRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard', component: DashboardComponent,  data: { title: 'Dashboard' }},
  { path: 'users', component: UsersComponent,  data: { title: 'Users' }},
  // { path: 'assignment', component: AssignmentComponent,  data: { title: 'Assignment' }},
  { path: 'school', component: SchoolComponent,  data: { title: 'School' }},
  { path: 'curriculum', component: CurriculumComponent,  data: { title: 'Curriculum' }},
  { path: 'reports', component: ReportsComponent,  data: { title: 'Reports' }},
  { path: 'notifications', component: NotificationsComponent,  data: { title: 'Notifications' }},
  { path: 'fees', component: FeesComponent,  data: { title: 'Fees' }},
  { path: 'raise-a-ticket', component: RaiseATicketComponent,  data: { title: 'Raise-A-Ticket' }},
  { path: 'attendence', component: AttendenceComponent,  data: { title: 'Attendence' }}
];

@NgModule({
  imports: [RouterModule.forChild(featuresRoutes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
