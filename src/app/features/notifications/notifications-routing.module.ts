import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NofityAllComponent } from './nofity-all/nofity-all.component';
import { NotifyLkgComponent } from './notify-lkg/notify-lkg.component';
import { NotifyNurseryComponent } from './notify-nursery/notify-nursery.component';
import { NotifyUkgComponent } from './notify-ukg/notify-ukg.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/all' },
  { path: 'all', component: NofityAllComponent },
  { path: 'nursery', component: NotifyNurseryComponent },
  { path: 'lkg', component: NotifyLkgComponent },
  { path: 'ukg', component: NotifyUkgComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
