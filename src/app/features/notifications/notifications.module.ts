import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NofityAllComponent } from './nofity-all/nofity-all.component';
import { NotifyLkgComponent } from './notify-lkg/notify-lkg.component';
import { NotifyNurseryComponent } from './notify-nursery/notify-nursery.component';
import { NotifyUkgComponent } from './notify-ukg/notify-ukg.component';

@NgModule({
  declarations: [
    NofityAllComponent,
    NotifyLkgComponent,
    NotifyUkgComponent,
    NotifyNurseryComponent
  ],
  imports: [CommonModule]
})
export class NotificationsModule {}
