import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
})
export class HotelListComponent {
  public title = 'liste hotels';

  public hotels: any[] = [
    {
      hotelId: 1,
      hotelName: 'Buea sweet life',
      description: 'Belle vue en au bord de la mer',
      price: 230.5,
      imageUrl: 'assets/img/hotel-room.jpg',
    },
    {
      hotelId: 2,
      hotelName: 'Marakech',
      description: 'Profitez de la vue sur les montagnes',
      price: 145.5,
      imageUrl: 'assets/img/the-interior.jpg',
    },
    {
      hotelId: 3,
      hotelName: 'Buea sweet life',
      description: 'Belle vue en au bord de la mer',
      price: 230.5,
      imageUrl: 'assets/img/indoors.jpg',
    },
    {
      hotelId: 4,
      hotelName: 'Cap town city',
      description: 'Belle vue en au bord de la mer',
      price: 230.5,
      imageUrl: 'assets/img/window.jpg',
    },
  ];
}
