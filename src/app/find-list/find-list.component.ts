import { BirthdayListParamsModel } from './../models/BirthdayListParamsModel';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Birthday } from '../models/BirthdayModel';
import { BirthdayService } from '../services/birthday.service';

@Component({
  selector: 'app-find-list',
  templateUrl: './find-list.component.html',
  styleUrls: ['./find-list.component.scss']
})

@UntilDestroy()
export class FindListComponent implements OnInit {

  bdays:Birthday[] | null=[];
  limit:number= this.birthdayService.limitDefault;
  offset:number = 0;
  total:number = 100;
  pageNumber:number =1;
  searchWord='';
  searchWord$:BehaviorSubject<string> = this.birthdayService.searchWord$;
  
  params:BirthdayListParamsModel={
    limit: this.limit, 
    offset: this.offset,
    searchWord:''
  };
  params$: BehaviorSubject<BirthdayListParamsModel>= new BehaviorSubject(this.params);
 
  constructor(private birthdayService:BirthdayService) { 
    
  }

  ngOnInit(): void {
    this.params$.pipe(  
      switchMap(p=>this.birthdayService.findBirthdayByName())  
      )
      .pipe(untilDestroyed(this))
      .subscribe(b=>{
        this.bdays=b.items,
        this.total=b.total    
    });
    
    this.searchWord$.pipe(  
      switchMap(p=>this.birthdayService.findBirthdayByName())  
      )
      .pipe(untilDestroyed(this))
      .subscribe(b=>{
        this.bdays=b.items,
        this.total=b.total    
    });   
  }  
 


  newParams(params:any){
    this.params$.next(params);  
    
  }

  ngOnDestroy(){
    //this.birthdayService.searchWord$.next('');
  }

}
