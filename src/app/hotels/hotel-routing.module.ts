import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { hotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'hotels', component: HotelListComponent },
      {
        path: 'hotels/:id',
        component: HotelDetailComponent,
        canActivate: [hotelDetailGuard],
      },
      { path: 'hotels/:id/edit', component: HotelEditComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class HotelRoutingModule {}
