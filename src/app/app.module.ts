import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { replaceComma } from './shared/pipes/replace-comma.pipe';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotel-list/hotel-detail/hotel-detail.component';
import { RouterModule } from '@angular/router';
import { hotelDetailGuard } from './hotel-list/hotel-detail.guard';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    replaceComma,
    StarRatingComponent,
    HomeComponent,
    HotelDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'hotels', component: HotelListComponent },
      {
        path: 'hotels/:id',
        component: HotelDetailComponent,
        canActivate: [hotelDetailGuard],
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
