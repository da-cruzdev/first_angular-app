import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IHotel } from '../models/hotel';

export class HotelData implements InMemoryDbService {
  createDb(): Record<string, IHotel[]> {
    const hotels: IHotel[] = [
      {
        id: 1,
        hotelName: 'Buea sweet life',
        description: 'Belle vue en au bord de la mer',
        price: 230.5,
        imageUrl: 'assets/img/hotel-room.jpg',
        rating: 3.5,
        tags: ['Nouveau'],
        categoryId: 0,
      },
      {
        id: 2,
        hotelName: 'Marakech',
        description: 'Profitez de la vue sur les montagnes',
        price: 145.5,
        imageUrl: 'assets/img/the-interior.jpg',
        rating: 5,
        tags: ['Nouveau'],
        categoryId: 1,
      },
      {
        id: 3,
        hotelName: 'Abudja new look place',
        description: 'Séjour complet avec service de voitures',
        price: 120.12,
        imageUrl: 'assets/img/indoors.jpg',
        rating: 4,
        tags: ['Nouveau'],
        categoryId: 0,
      },
      {
        id: 4,
        hotelName: 'Cap town city',
        description: 'Magnifique cadre pour votre séjour',
        price: 135.12,
        imageUrl: 'assets/img/window.jpg',
        rating: 2.5,
        tags: ['Nouveau'],
        categoryId: 1,
      },
    ];
    return { hotels };
  }

  genId(hotels: IHotel[]): number {
    return hotels.length > 0
      ? Math.max(...hotels.map((hotel) => hotel.id)) + 1
      : 1;
  }
}
