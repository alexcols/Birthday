import { Birthday } from './../models/BirthdayModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {HttpClient} from '@angular/common/http';
import { PagedResponse } from '../models/PagedResponse';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  constructor(private http:HttpClient) { }

  postBirthday(bday:Birthday){
    return this.http.post('/api/birthday', bday);
  }

  getNextBirthdays(limit:number):Observable<PagedResponse<Birthday>>{

    return this.http.get<PagedResponse<Birthday>>(
      `/api/birthday/next?limit=${limit}`
    )
  }



  public ShowImageFromBlob(bday: Birthday) : string 
  {
    return 'data:image/' + bday.photoType.replace('.', '') + ';base64,' + bday.photoContent;
  } 

}
