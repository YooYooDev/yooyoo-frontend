import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HeaderNotificationsComponent } from './header/header-notifications/header-notifications.component';
import { ProfileComponent } from './header/profile/profile.component';
import { SettingsComponent } from './header/settings/settings.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    HeaderNotificationsComponent,
    ProfileComponent,
    SettingsComponent
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    HeaderNotificationsComponent
  ],
  providers: [LoginService]
})
export class SharedModule {}
