import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { replaceComma } from './pipes/replace-comma.pipe';

@NgModule({
  declarations: [StarRatingComponent, replaceComma],
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingComponent,
    replaceComma,
  ],
})
export class SharedModule {}
