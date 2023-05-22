import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';
import { GlobalGenericValidator } from '../shared/validators/global-generique.validator';
import { EMPTY, Observable, fromEvent, merge, timer } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { NumberValidators } from '../shared/validators/numbers.validator';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css'],
})
export class HotelEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  inputElements!: ElementRef[];

  public hotelForm: FormGroup | any;

  public hotel!: IHotel;

  public formTitle!: string;

  public errorMessage!: string;

  public formErrors: { [key: string]: string } = {};

  public validationMessages: { [key: string]: { [key: string]: string } } = {
    hotelName: {
      required: "Le nom d'hotel est obligatoire",
      minlength: "Le nom de l'hotel doit comporter au mons 4 caractères",
    },
    price: {
      required: "Le prix d'hotel est obligatoire",
      pattern: "Le prix de l'hotel doit être un nombre",
    },
    rating: {
      range: 'Donnez une note comprise entre 1 et 5',
    },
  };

  private globalGenericValidator!: GlobalGenericValidator;
  private isFormSubmitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.globalGenericValidator = new GlobalGenericValidator(
      this.validationMessages
    );
    this.hotelForm = this.fb.group({
      hotelName: ['', [Validators.required, Validators.minLength(4)]],
      price: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      rating: ['', NumberValidators.range(1, 5)],
      description: [''],
      tags: this.fb.array([]),
    });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const id: number = idParam ? +idParam : 0;

      this.getSelectedHotel(id);
    });
  }

  ngAfterViewInit(): void {
    const formControlBlurs: Observable<Event>[] = this.inputElements.map(
      (formControlElemRef: ElementRef) =>
        fromEvent(formControlElemRef.nativeElement, 'blur')
    );

    merge(this.hotelForm.valueChanges, ...formControlBlurs)
      .pipe(debounceTime(800))
      .subscribe(() => {
        this.formErrors = this.globalGenericValidator.createErrorMessage(
          this.hotelForm,
          this.isFormSubmitted
        );
        console.log('error===========================', this.formErrors);
      });
  }

  public hideError(): void {
    this.errorMessage = '';
  }

  public get tags(): FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTags(): void {
    this.tags.push(new FormControl());
  }

  public deleteTags(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  public getSelectedHotel(id: number): void {
    this.hotelService.getHotelById(id).subscribe((hotel: IHotel) => {
      this.displayHotel(hotel);
    });
  }

  public displayHotel(hotel: IHotel): void {
    this.hotel = hotel;

    if (this.hotel.id === 0) {
      this.formTitle = 'Créer un hotel';
    } else {
      this.formTitle = `Modifier l'hotel ${this.hotel.hotelName}`;
    }

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description,
    });
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []));
  }

  public saveHotel(): void {
    this.isFormSubmitted = true;
    this.hotelForm.updateValueAndValidity({
      onlySelf: true,
      emitEvent: true,
    });
    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {
        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelForm.value,
        };
        if (hotel.id === 0) {
          this.hotelService.createHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => (this.errorMessage = err),
          });
        } else {
          this.hotelService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => (this.errorMessage = err),
          });
        }
      }
    } else {
      this.errorMessage = "Corrigez les erreurs s'il vous plaît";
    }
  }

  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels']);
  }

  public deleteHotel() {
    if (confirm(`Voulez-vous  réellement supprimer ${this.hotel.hotelName}?`)) {
      this.hotelService.deleteHotel(this.hotel.id).subscribe({
        next: () => this.saveCompleted(),
      });
    }
  }
}
