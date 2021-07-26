import { BirthdayListParamsModel } from './../models/BirthdayListParamsModel';
import { BirthdayRequest } from './../models/BirthdayRequest';
import { Birthday } from './../models/BirthdayModel';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {HttpClient} from '@angular/common/http';
import { PagedResponse } from '../models/PagedResponse';


@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  
  public bList$:BehaviorSubject<Birthday[]>= new BehaviorSubject<Birthday[]>([]);
  public params$:BehaviorSubject<BirthdayListParamsModel>= new BehaviorSubject<BirthdayListParamsModel>({limit: 100, offset: 0})

  constructor(private http:HttpClient) { }

  postBirthday(bday:any){
    
    return this.http.post('/api/birthday/', bday);
  }

  getNextBirthdays(limit:number | undefined):Observable<PagedResponse<Birthday>>{

    return this.http.get<PagedResponse<Birthday>>(
      `/api/birthday/next?limit=${limit}`
    )
  }
  getListBirthdays():Observable<PagedResponse<Birthday>>{
    this.params$.next({limit:100, offset:0})
    return this.http.get<PagedResponse<Birthday>>(
      `api/birthday?Limit=${this.params$.value.limit}&Offset=${this.params$.value.offset}`
    )
    
  }

  getBirthday(id:number | string):Observable<Birthday>{
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

  editBirthday(bday:any){
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
