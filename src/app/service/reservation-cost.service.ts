import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ReservationCost} from '../model/reservation-cost';
import {reservationCostMock} from '../mock/reservation-cost.mock';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationCostService {

  constructor(private http: HttpClient) { }

  getReservationCost():Observable<ReservationCost>{
    return of(reservationCostMock);
  }


  //Asi seria la llamada HTTP para este Servicio
  getReservationCostService(peticion:any,uiid:string):Observable<ReservationCost>{
    return this.http.post<ReservationCost>(`${environment.url}/${uiid}/reservation-cost`,peticion);
  }
}
