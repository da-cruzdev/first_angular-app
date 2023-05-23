import { Component, OnInit } from '@angular/core';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  combineLatest,
  of,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  public filterSubject: Subject<string> = new BehaviorSubject<string>('');

  constructor(private readonly hotelListService: HotelListService) {}
  ngOnInit(): void {
    this.hotels$ = this.hotelListService.hotelsWithCategories$.pipe(
      catchError((err) => {
        this.errMsg = err;
        return EMPTY;
      })
    );

    this.filteredHotels$ = this.createFilterHotels(
      this.filterSubject,
      this.hotels$
    );

    this.hotelFilter = '';
  }

  public filterChange(value: string) {
    this.filterSubject.next(value);
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
  }

  public createFilterHotels(
    filter$: Observable<string>,
    hotels$: Observable<IHotel[]>
  ): Observable<IHotel[]> {
    return combineLatest(
      hotels$,
      filter$,
      (hotels: IHotel[], filter: string) => {
        if (filter === '') {
          return hotels;
        } else {
          return hotels.filter(
            (hotel: IHotel) =>
              hotel.hotelName.toLocaleLowerCase().indexOf(filter) !== -1
          );
        }
      }
    );
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
