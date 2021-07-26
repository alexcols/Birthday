import { Birthday } from './../models/BirthdayModel';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { PagedResponse } from '../models/PagedResponse';


@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  public limitNext=5; 
  public limitDefault = 5;
  public params$:BehaviorSubject<any>= new BehaviorSubject({limit: this.limitDefault, offset: 0})
  public paginationTotal$:BehaviorSubject<number> = new BehaviorSubject(0);

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

    return this.http.get<PagedResponse<Birthday>>(
      `api/birthday?Limit=${this.params$.value.limit}&Offset=${this.params$.value.offset}`
    )    
  }

  getBirthday(id:number | string):Observable<Birthday>{
    
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
