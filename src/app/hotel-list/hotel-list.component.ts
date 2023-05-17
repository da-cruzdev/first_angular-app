import { Component, OnInit } from '@angular/core';
import { IHotel } from './hotel';
import { HotelListService } from './hotel-list.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {
  public title = 'liste hotels';

  public hotels: IHotel[] = [];

  public showBadge: boolean | undefined;

  private _hotelFilter = 'mot';

  public filteredHotels: IHotel[] = [];

  constructor(private readonly hotelListService: HotelListService) {}

  ngOnInit(): void {
    this.hotels = this.hotelListService.getHotels();
    this.filteredHotels = this.hotels;
    this.hotelFilter = '';
  }

  public toggleIsNewBadge(): void {
    this.showBadge = !this.showBadge;
  }

  public get hotelFilter(): string {
    return this._hotelFilter;
  }

  public receivedRating: string | undefined;

  public set hotelFilter(filter: string) {
    this._hotelFilter = filter;

    this.filteredHotels = this.hotelFilter
      ? this.filterHotels(this.hotelFilter)
      : this.hotels;
  }

  private filterHotels(criteria: string): IHotel[] {
    criteria = criteria.toLocaleLowerCase();

    const result = this.hotels.filter(
      (hotel: IHotel) =>
        hotel.hotelName.toLocaleLowerCase().indexOf(criteria) !== -1
    );

    return result;
  }

  public receiveRatingClicked(message: string) {
    this.receivedRating = message;
  }
}
