import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './shared/header/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent, data: { title: 'Home' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { title: 'Profile' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
