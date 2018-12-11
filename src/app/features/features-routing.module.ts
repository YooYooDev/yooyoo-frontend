import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { assignmentRoutes } from './assignment/assignment-routing';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentModule } from './assignment/assignment.module';
import { attendenceRoutes } from './attendence/attendence-routing';
import { AttendenceComponent } from './attendence/attendence.component';
import { AttendenceModule } from './attendence/attendence.module';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { feesRoutes } from './fees/fees-routing';
import { FeesComponent } from './fees/fees.component';
import { FeesModule } from './fees/fees.module';
import { notificationRoutes } from './notifications/notifications-routing';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsModule } from './notifications/notifications.module';
import { RaiseATicketComponent } from './raise-a-ticket/raise-a-ticket.component';
import { ReportsComponent } from './reports/reports.component';
import { SchoolComponent } from './school/school.component';
import { UsersComponent } from './users/users.component';

const featuresRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  { path: 'users', component: UsersComponent, data: { title: 'Users' } },
  {
    path: 'assignment',
    component: AssignmentComponent,
    children: assignmentRoutes,
    data: { title: 'Assignment' }
  },
  { path: 'school', component: SchoolComponent, data: { title: 'School' } },
  {
    path: 'curriculum',
    component: CurriculumComponent,
    data: { title: 'Curriculum' }
  },
  { path: 'reports', component: ReportsComponent, data: { title: 'Reports' } },
  {
    path: 'notifications',
    component: NotificationsComponent,
    children: notificationRoutes,
    data: { title: 'Notifications' }
  },
  {
    path: 'fees',
    component: FeesComponent,
    children: feesRoutes,
    data: { title: 'Fees' }
  },
  {
    path: 'raise-a-ticket',
    component: RaiseATicketComponent,
    data: { title: 'Raise-A-Ticket' }
  },
  {
    path: 'attendence',
    component: AttendenceComponent,
    children: attendenceRoutes,
    data: { title: 'Attendence' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(featuresRoutes),
    AssignmentModule,
    AttendenceModule,
    FeesModule,
    NotificationsModule
  ],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
