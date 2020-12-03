import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {

  private reservationDataSubject: BehaviorSubject<any>;
  public $reservationData: Observable<any>;

  constructor() {
    this.reservationDataSubject = new BehaviorSubject<any>(null);
    this.$reservationData = this.reservationDataSubject.asObservable();
  }

  setReservationData(datos:any){
    this.reservationDataSubject.next(datos);
  }
}
