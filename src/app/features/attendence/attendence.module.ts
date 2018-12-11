import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AtLkgComponent } from './at-lkg/at-lkg.component';
import { AtNurseryComponent } from './at-nursery/at-nursery.component';
import { AtUkgComponent } from './at-ukg/at-ukg.component';
import { AttendenceRoutingModule } from './attendence-routing.module';

@NgModule({
  declarations: [AtNurseryComponent, AtLkgComponent, AtUkgComponent],
  imports: [
    CommonModule,
    AttendenceRoutingModule
  ]
})
export class AttendenceModule { }
