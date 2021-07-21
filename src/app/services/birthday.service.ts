import { Birthday } from './../models/BirthdayModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  constructor(private http:HttpClient) { }

  getNextBirthdays(limit:number):Observable<Birthday[]>{

    return this.http.get<Birthday[]>(
      `/api/birthday/next?limit=5`
    )
  }
}
