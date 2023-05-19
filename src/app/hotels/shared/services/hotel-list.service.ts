import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { IHotel } from '../models/hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelListService {
  private readonly HOTEL_API_URL = 'api/hotels.json';

  constructor(private http: HttpClient) {}

  public getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
      tap((hotels) => console.log('hotels: ', hotels)),
      catchError(this.handleError)
    );
  }

  public getHotelById(id: number): Observable<IHotel> {
    if (id === 0) {
      return of(this.getDefaultHotel());
    }
    return this.getHotels().pipe(
      map((hotels) => hotels.find((hotel) => hotel.hotelId === id)),
      filter((hotel) => !!hotel),
      map((hotel) => hotel as IHotel)
    );
  }

  private getDefaultHotel(): IHotel {
    return {
      hotelId: 0,
      hotelName: '',
      description: '',
      price: 0,
      rating: 0,
      imageUrl: '',
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}`,
        +`body was ${error.error}`
      );
    }

    return throwError('Something has happened; Please try again later');
  }
}
