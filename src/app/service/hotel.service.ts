import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hotel} from '../model/hotel';
import {Observable, of} from 'rxjs';
import {HotelMock} from '../mock/hotel.mock';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  getHotel():Observable<Hotel>{
    return of(HotelMock)
  }

  //Asi seria la llamada HTTP para este Servicio
  getHotelHttp(uiid:string):Observable<Hotel>{
    return this.http.get<Hotel>(`${environment.url}/${uiid}`)
  }
}
