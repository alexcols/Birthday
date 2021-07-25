import { BirthdayRequest } from './../models/BirthdayRequest';
import { Birthday } from './../models/BirthdayModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {HttpClient} from '@angular/common/http';
import { PagedResponse } from '../models/PagedResponse';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  public idBirthday: number = 0;

  constructor(private http:HttpClient) { }

  postBirthday(bday:any){

    console.log('bdayPostService', bday);
    
    
    return this.http.post('/api/birthday/', bday);
  }

  getNextBirthdays(limit:number):Observable<PagedResponse<Birthday>>{

    return this.http.get<PagedResponse<Birthday>>(
      `/api/birthday/next?limit=${limit}`
    )
  }

  getBirthday(id:number | string):Observable<BirthdayRequest>{
    console.log(id);
    
    return this.http.get<Birthday>(
      `api/birthday/${id}`
    )
  }

  deleteBirthday(id:number){
     return this.http.delete(
      `/api/birthday/${id}`
    )
  }

  editBirthday(bday:BirthdayRequest){
    return this.http.put('/api/birthday', bday);
  }



  public ShowImageFromBlob(bday: Birthday) : string 
  {
    if (bday.photoType !== undefined)
    return 'data:image/' + bday.photoType.replace('.', '') + ';base64,' + bday.photoContent;
    else
    return 'type Error'
  } 

}
