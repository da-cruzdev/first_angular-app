import { Component, OnInit } from '@angular/core';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

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

  public errMsg: string | undefined;

  public filteredHotels: IHotel[] = [];

  constructor(private readonly hotelListService: HotelListService) {}
  ngOnInit(): void {
    this.hotelListService.getHotels().subscribe({
      next: (hotels) => {
        (this.hotels = hotels), (this.filteredHotels = this.hotels);
      },
      error: (err) => (this.errMsg = err),
    });
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
