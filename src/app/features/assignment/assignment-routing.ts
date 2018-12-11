import { Routes } from '@angular/router';

import { AsLkgComponent } from './as-lkg/as-lkg.component';
import { AsNurseryComponent } from './as-nursery/as-nursery.component';
import { AsUkgComponent } from './as-ukg/as-ukg.component';

export const assignmentRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'nursery' },
  { path: 'nursery', component: AsNurseryComponent },
  { path: 'lkg', component: AsLkgComponent },
  { path: 'ukg', component: AsUkgComponent }
];
