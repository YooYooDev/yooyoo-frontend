import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsLkgComponent } from './as-lkg/as-lkg.component';
import { AsNurseryComponent } from './as-nursery/as-nursery.component';
import { AsUkgComponent } from './as-ukg/as-ukg.component';

@NgModule({
  declarations: [
    AsNurseryComponent,
    AsLkgComponent,
    AsUkgComponent
  ],
  imports: [CommonModule]
})
export class AssignmentModule {}
