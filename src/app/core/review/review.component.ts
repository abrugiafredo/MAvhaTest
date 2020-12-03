import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {SubscriptionLike} from 'rxjs';
import {HotelService} from '../../service/hotel.service';
import {ReservationCostService} from '../../service/reservation-cost.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservationDataService} from '../../service/reservation-data.service';
import {Hotel} from '../../model/hotel';
import {HotelC} from '../../model/hotel-c';
import {ReservationCost} from '../../model/reservation-cost';
import {ReservationCostC} from '../../model/reservation-cost-c';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit,OnDestroy {

  public readonly: boolean = true;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;
  public mindate: NgbDate;
  public hoveredDate: NgbDate | null = null;
  public hotel: Hotel;
  public guest: number = 1;
  public childrens: number = 0;
  public pets: boolean = false;
  public coments:string="";
  public reservationCost: ReservationCost;

  private subs: SubscriptionLike[];
  constructor(private calendar: NgbCalendar, private hoSV: HotelService, private resCostSV: ReservationCostService,
              private resDataSV: ReservationDataService, private router: Router, private acRt: ActivatedRoute,public formatter: NgbDateParserFormatter) {
    this.subs = [];
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
    this.mindate = calendar.getToday();
    this.hotel = HotelC.empty();
    this.reservationCost = ReservationCostC.empty();
  }

  ngOnInit(): void {
    this.subs.push(
      this.hoSV.getHotel().subscribe(res => {
        this.hotel = res;
      }, error => {
        console.log('hubo un error');
      })
    );
    this.subs.push(
      this.resCostSV.getReservationCost().subscribe(res => {
        this.reservationCost = res;
      }, error => {
        console.log('hubo une error');
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  minusGuest() {
    if (this.guest > 1) {
      this.guest--;
    }
  }

  plusGuest() {
    this.guest++;
  }

  minusChild() {
    if (this.childrens > 0) {
      this.childrens--;
    }
  }

  plusChild() {
    this.childrens++;
  }

  returnNight(){
    if(this.fromDate&&this.toDate) {
      const diff=new Date(this.formatter.format(this.toDate)).getTime() - new Date(this.formatter.format(this.fromDate)).getTime();
      return Math.round(diff/(1000*60*60*24));
    }else {
      return 0;
    }
  }

  next() {
    if (this.fromDate && this.toDate) {
      let datosReserva: any = {
        hotel: this.hotel,
        stayInformation: {
          from_date: new Date(this.fromDate.year, (this.fromDate.month - 1), this.fromDate.day),
          to_date: new Date(this.toDate.year, (this.toDate.month - 1), this.toDate.day),
          guest: this.guest,
          childrens: this.childrens,
          pets: this.pets,
          message: this.coments
        },
        cost: this.reservationCost
      };
      this.resDataSV.setReservationData(datosReserva);
      this.router.navigate(['/confirmation'], {relativeTo: this.acRt});
    }
  }
}
