import { Injectable } from '@angular/core';
import { IHotel } from './hotel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
