import { BirthdayListParamsModel } from './../models/BirthdayListParamsModel';
import { Birthday } from './../models/BirthdayModel';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { PagedResponse } from '../models/PagedResponse';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  public limitNext=5; 
  public limitDefault = 5;
  params:BirthdayListParamsModel={
    limit: this.limitDefault, 
    offset: 0,
    searchWord:''
  };
  public params$:BehaviorSubject<BirthdayListParamsModel>= new BehaviorSubject(this.params);
  public paginationTotal$:BehaviorSubject<number> = new BehaviorSubject(0);
  public searchWord$:BehaviorSubject<string>= new BehaviorSubject('');

  previousUrl='';

  constructor(private http:HttpClient,
    private router: Router) {
    this.router.events.pipe(
      //untilDestroyed(this),
      filter(e => e instanceof RoutesRecognized),
      pairwise()
    )
    .subscribe((event: any[]) => {
      this.previousUrl=event[0].urlAfterRedirects      
    });
   }

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

  findBirthdayByName():Observable<PagedResponse<Birthday>>{

      return this.http.get<PagedResponse<Birthday>>(
        `api/birthday/find?SearchName=${this.searchWord$.value}&Limit=${this.params$.value.limit}&Offset=${this.params$.value.offset}`
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
