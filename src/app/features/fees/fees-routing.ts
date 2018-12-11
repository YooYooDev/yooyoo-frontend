import { Routes } from '@angular/router';

import { FLkgComponent } from './f-lkg/f-lkg.component';
import { FNurseryComponent } from './f-nursery/f-nursery.component';
import { FUkgComponent } from './f-ukg/f-ukg.component';

export const feesRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'nursery' },
  { path: 'nursery', component: FNurseryComponent },
  { path: 'lkg', component: FLkgComponent },
  { path: 'ukg', component: FUkgComponent }
];
