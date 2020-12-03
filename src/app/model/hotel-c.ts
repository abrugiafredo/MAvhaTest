import {Hotel} from './hotel';

export class HotelC {
  public static empty():Hotel{
    return {
      adults:0,
      childrens:0,
      description:'',
      image_url:'',
      nombre:'',
      pets:false,
      start:0
    }
  }
}
