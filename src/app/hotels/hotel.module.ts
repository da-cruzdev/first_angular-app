import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { hotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';

@NgModule({
  declarations: [HotelListComponent, HotelDetailComponent],
  imports: [SharedModule, HotelRoutingModule],
})
export class HotelModule {}
