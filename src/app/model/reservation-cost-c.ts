import {ReservationCost} from './reservation-cost';


export class ReservationCostC {
  public static empty():ReservationCost{
    return {
      nights_count: 0,
      nights_cost: 0,
      discount: 0,
      cleaning_fee: 0,
      total: 0
    }
  }
}
