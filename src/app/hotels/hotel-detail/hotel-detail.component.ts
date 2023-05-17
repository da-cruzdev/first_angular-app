import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';

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

  public hotel: IHotel = <IHotel>{};

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id: number = idParam ? +idParam : 0;
    this.hotelService.getHotels().subscribe((hotels: IHotel[]) => {
      this.hotel = hotels.find((h) => h.hotelId === id) || <IHotel>{};

      console.log('hotels: ', this.hotel);
    });
  }

  public backToList(): void {
    this.router.navigate(['/hotels']);
  }
}
