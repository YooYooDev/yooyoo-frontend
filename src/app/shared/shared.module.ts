import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';

import { ToastComponent } from './components/toast.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderNotificationsComponent } from './header/header-notifications/header-notifications.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './header/profile/profile.component';
import { SettingsComponent } from './header/settings/settings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginService } from './services/login.service';
import { ToastService } from './services/toast.service';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    HeaderNotificationsComponent,
    ProfileComponent,
    SettingsComponent,
    ToastComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedRoutingModule,
    ToasterModule.forRoot()
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    HeaderNotificationsComponent,
    ToastComponent
  ],
  providers: [LoginService, ToastService]
})
export class SharedModule {}
