import { Routes } from '@angular/router';

import { AtLkgComponent } from './at-lkg/at-lkg.component';
import { AtNurseryComponent } from './at-nursery/at-nursery.component';
import { AtUkgComponent } from './at-ukg/at-ukg.component';

export const attendenceRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'nursery' },
  { path: 'nursery', component: AtNurseryComponent },
  { path: 'lkg', component: AtLkgComponent },
  { path: 'ukg', component: AtUkgComponent }
];
