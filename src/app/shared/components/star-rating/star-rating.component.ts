import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnChanges {
  public starWidth: number | undefined;

  public rating: number = 2;

  ngOnChanges(changes: SimpleChanges): void {
    this.starWidth = (this.rating * 125) / 5;
  }
}
