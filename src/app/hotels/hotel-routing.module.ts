import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { hotelDetailGuard } from './shared/guards/hotel-detail.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'hotels', component: HotelListComponent },
      {
        path: 'hotels/:id',
        component: HotelDetailComponent,
        canActivate: [hotelDetailGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class HotelRoutingModule {}
