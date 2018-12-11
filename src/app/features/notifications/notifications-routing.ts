import { Routes } from '@angular/router';

import { NofityAllComponent } from './nofity-all/nofity-all.component';
import { NotificationsComponent } from './notifications.component';
import { NotifyLkgComponent } from './notify-lkg/notify-lkg.component';
import { NotifyNurseryComponent } from './notify-nursery/notify-nursery.component';
import { NotifyUkgComponent } from './notify-ukg/notify-ukg.component';

export const notificationRoutes: Routes = [
  { path: '', component: NotificationsComponent},
  { path: 'all', component: NofityAllComponent },
  { path: 'nursery', component: NotifyNurseryComponent },
  { path: 'lkg', component: NotifyLkgComponent },
  { path: 'ukg', component: NotifyUkgComponent }
];
