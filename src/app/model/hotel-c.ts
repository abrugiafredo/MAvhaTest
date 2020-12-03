import {Hotel} from './hotel';

export class HotelC {
  public static empty():Hotel{
    return {
      adults:0,
      childrens:0,
      description:'',
      image_url:'',
      name:'',
      pets:false,
      start:0
    }
  }
}
