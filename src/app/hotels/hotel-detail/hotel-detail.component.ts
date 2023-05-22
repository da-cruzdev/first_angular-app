import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';
import { map } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
})
export class HotelDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly hotelService: HotelListService,
    private router: Router
  ) {}

  public hotel$: Observable<IHotel | undefined> = of(undefined);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id: number = idParam ? +idParam : 0;
    this.hotel$ = this.hotelService
      .getHotels()
      .pipe(map((hotels: IHotel[]) => hotels.find((hotel) => hotel.id === id)));
  }

  public backToList(): void {
    this.router.navigate(['/hotels']);
  }
}
