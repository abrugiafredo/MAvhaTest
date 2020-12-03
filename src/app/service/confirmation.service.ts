import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Confirmation} from '../model/confirmation';
import {Observable, of} from 'rxjs';
import {confirmationMock} from '../mock/confirmation.mock';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private http: HttpClient) { }

  public getConfirmation():Observable<Confirmation>{
    return of(confirmationMock)
  }

  //Asi seria la llamada HTTP para este Servicio
  confirmationService(peticion:any,uiid:string):Observable<Confirmation>{
    return this.http.post<Confirmation>(`${environment.url}/${uiid}/confirm-reservation`,peticion);
  }
}
