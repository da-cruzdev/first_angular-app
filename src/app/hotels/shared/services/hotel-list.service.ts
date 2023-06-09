import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, combineLatest, of, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { IHotel } from '../models/hotel';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class HotelListService {
  private readonly HOTEL_API_URL = 'api/hotels';

  public hotelsWithCategories$ = combineLatest([
    this.getHotels(),
    this.getCategories(),
  ]).pipe(
    map(([hotels, categories]) =>
      hotels.map(
        (hotel) =>
          ({
            ...hotel,
            price: hotel.price * 1.5,
            category: categories.find(
              (category) => category.id === hotel.categoryId
            )?.name,
          } as IHotel)
      )
    )
  );

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

  public deleteHotel(id: number): Observable<{}> {
    const url = `${this.HOTEL_API_URL}/${id}`;
    return this.http.delete<IHotel>(url).pipe(catchError(this.handleError));
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

  public getCategories(): Observable<Category[]> {
    return of([
      {
        id: 0,
        name: 'Motel',
      },
      {
        id: 1,
        name: 'Auberge',
      },
    ]);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      errorMessage = `AN error occured ${error.error.message}`;
    } else {
      console.error(
        `Backend returned code ${error.status}`,
        +`body was ${error.error}`,
        (errorMessage = `Backend returned code ${error.status}`),
        +`body was ${error.error}`
      );
    }

    return throwError(
      'Something has happened; Please try again later' + '\n' + errorMessage
    );
  }
}
