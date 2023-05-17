import { Component, OnInit } from '@angular/core';
import { IHotel } from './hotel';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {
  public title = 'liste hotels';

  public hotels: IHotel[] = [
    {
      hotelId: 1,
      hotelName: 'Buea sweet life',
      description: 'Belle vue en au bord de la mer',
      price: 230.5,
      imageUrl: 'assets/img/hotel-room.jpg',
      rating: 3.5,
    },
    {
      hotelId: 2,
      hotelName: 'Marakech',
      description: 'Profitez de la vue sur les montagnes',
      price: 145.5,
      imageUrl: 'assets/img/the-interior.jpg',
      rating: 5,
    },
    {
      hotelId: 3,
      hotelName: 'Buea sweet life',
      description: 'Belle vue en au bord de la mer',
      price: 230.5,
      imageUrl: 'assets/img/indoors.jpg',
      rating: 4,
    },
    {
      hotelId: 4,
      hotelName: 'Cap town city',
      description: 'Belle vue en au bord de la mer',
      price: 230.5,
      imageUrl: 'assets/img/window.jpg',
      rating: 2.5,
    },
  ];

  public showBadge: boolean | undefined;

  private _hotelFilter = 'mot';

  public filteredHotels: IHotel[] = [];

  ngOnInit(): void {
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
