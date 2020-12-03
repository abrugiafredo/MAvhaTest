import {Component, OnDestroy, OnInit} from '@angular/core';
import {Confirmation} from '../../model/confirmation';
import {SubscriptionLike} from 'rxjs';
import {ConfirmationC} from '../../model/confirmation-c';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservationDataService} from '../../service/reservation-data.service';
import {ConfirmationService} from '../../service/confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  public reservationData:any;
  public confirmation:Confirmation;


  private subs:SubscriptionLike[];
  constructor(private router:Router,private acRt:ActivatedRoute,private dataSV:ReservationDataService,private confSV:ConfirmationService) {
    this.subs=[];
    this.confirmation=ConfirmationC.empty();
  }

  ngOnInit(): void {
    this.subs.push(
      this.dataSV.$reservationData.subscribe(res=>{
        if(res==null){
          this.router.navigate(["/review"],{relativeTo:this.acRt})
        }else{
          this.reservationData=res;
        }
      })
    )
  }
  returnNight(){
    if(this.reservationData.stayInformation.from_date&&this.reservationData.stayInformation.to_date) {
      const dif=this.reservationData.stayInformation.to_date.getTime() - this.reservationData.stayInformation.from_date.getTime();
      return  Math.round(dif/(1000*60*60*24));
    }else {
      return 0;
    }
  }


  confirm() {
    this.subs.push(
      this.confSV.getConfirmation().subscribe(res=>{
        this.confirmation=res;
      },error => {
        console.log("Error en la reserva")
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe());
    this.dataSV.setReservationData(null);
  }

}
