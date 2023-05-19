import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { IHotel } from '../models/hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelListService {
  private readonly HOTEL_API_URL = 'api/hotels';

  constructor(private http: HttpClient) {}

  public getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
      tap((hotels) => console.log('hotels: ', hotels)),
      catchError(this.handleError)
    );
  }

  public getHotelById(id: number): Observable<IHotel> {
    const url = `${this.HOTEL_API_URL}/ ${id}`;
    if (id === 0) {
      return of(this.getDefaultHotel());
    }
    return this.http.get<IHotel>(url).pipe(catchError(this.handleError));
  }

  public createHotel(hotel: IHotel): Observable<IHotel> {
    const newHotel = {
      ...hotel,
      imageUrl: 'assets/img/hotel-room.jpg',
      id: null,
    };
    return this.http
      .post<IHotel>(this.HOTEL_API_URL, newHotel)
      .pipe(catchError(this.handleError));
  }

  public updateHotel(hotel: IHotel): Observable<IHotel> {
    const url = `${this.HOTEL_API_URL}/${hotel.id}`;
    return this.http.put<IHotel>(url, hotel).pipe(catchError(this.handleError));
  }

  private getDefaultHotel(): IHotel {
    return {
      id: 0,
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
