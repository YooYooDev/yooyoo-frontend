import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NofityAllComponent } from './nofity-all/nofity-all.component';
import { NotifyLkgComponent } from './notify-lkg/notify-lkg.component';
import { NotifyUkgComponent } from './notify-ukg/notify-ukg.component';
import { NotifyNurseryComponent } from './notify-nursery/notify-nursery.component';

@NgModule({
  declarations: [NofityAllComponent, NotifyLkgComponent, NotifyUkgComponent, NotifyNurseryComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
