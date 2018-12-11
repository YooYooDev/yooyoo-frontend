import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsLkgComponent } from './as-lkg/as-lkg.component';
import { AsNurseryComponent } from './as-nursery/as-nursery.component';
import { AsUkgComponent } from './as-ukg/as-ukg.component';
import { AssignmentRoutingModule } from './assignment-routing.module';

@NgModule({
  declarations: [AsNurseryComponent, AsLkgComponent, AsUkgComponent],
  imports: [
    CommonModule,
    AssignmentRoutingModule
  ]
})
export class AssignmentModule { }
