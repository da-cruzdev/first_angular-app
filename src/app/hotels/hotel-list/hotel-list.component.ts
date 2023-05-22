import { Component, OnInit } from '@angular/core';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {
  public title = 'liste hotels';

  public hotels$: Observable<IHotel[]> = of([]);

  public showBadge: boolean = true;

  private _hotelFilter = 'mot';

  public errMsg: string | undefined;

  public filteredHotels$: Observable<IHotel[]> = of([]);

  constructor(private readonly hotelListService: HotelListService) {}
  ngOnInit(): void {
    this.hotels$ = this.hotelListService.getHotels();
    this.filteredHotels$ = this.hotels$;
    // this.hotelListService.getHotels().subscribe({
    //   next: (hotels) => {
    //     (this.hotels = hotels), (this.filteredHotels = this.hotels);
    //   },
    //   error: (err) => (this.errMsg = err),
    // });
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

    if (this.hotelFilter) {
      this.filteredHotels$ = this.hotels$.pipe(
        map((hotels: IHotel[]) => this.filterHotels(filter, hotels))
      );
    } else {
      this.filteredHotels$ = this.hotels$;
    }

    // this.filteredHotels = this.hotelFilter
    //   ? this.filterHotels(this.hotelFilter)
    //   : this.hotels;
  }

  private filterHotels(criteria: string, hotels: IHotel[]): IHotel[] {
    criteria = criteria.toLocaleLowerCase();

    const result = hotels.filter(
      (hotel: IHotel) =>
        hotel.hotelName.toLocaleLowerCase().indexOf(criteria) !== -1
    );

    return result;
  }

  public receiveRatingClicked(message: string) {
    this.receivedRating = message;
  }
}
