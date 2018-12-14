import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './shared/header/profile/profile.component';
import { AuthGuard } from './core/auth/auth.guard';

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
