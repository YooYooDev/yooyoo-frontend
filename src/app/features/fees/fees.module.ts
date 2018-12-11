import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FNurseryComponent } from './f-nursery/f-nursery.component';
import { FLkgComponent } from './f-lkg/f-lkg.component';
import { FUkgComponent } from './f-ukg/f-ukg.component';

@NgModule({
  declarations: [FNurseryComponent, FLkgComponent, FUkgComponent],
  imports: [CommonModule]
})
export class FeesModule {}
