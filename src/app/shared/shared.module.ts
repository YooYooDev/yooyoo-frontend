import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';

import { LoginService } from './services/login.service';
import { ToastComponent } from './components/toast.component';
import { HeaderNotificationsComponent } from './header/header-notifications/header-notifications.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './header/profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ToastService } from './services/toast.service';
import { SharedRoutingModule } from './shared-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { LoaderComponent } from './loader/loader.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    HeaderNotificationsComponent,
    ProfileComponent,
    ToastComponent,
    LoaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedRoutingModule,
    ToasterModule.forRoot(),
    HttpClientModule,
    ListViewModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    HeaderNotificationsComponent,
    ToastComponent,
    LoaderComponent
  ],
  providers: [
    LoginService,
    ToastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ]
})
export class SharedModule {}
