import { Birthday } from './../models/BirthdayModel';
import { BirthdayListParamsModel } from './../models/BirthdayListParamsModel';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BirthdayService } from '../services/birthday.service';

@Component({
  selector: 'app-list-birthday',
  templateUrl: './list-birthday.component.html',
  styleUrls: ['./list-birthday.component.scss']
})
@UntilDestroy()
export class ListBirthdayComponent implements OnInit {

  @Input()
  bdays:Birthday[] | null=[];
  limit:number= 100;
  offset:number = 0;
  
  params:BirthdayListParamsModel ={limit:this.limit, 
    offset: this.offset};
  params$: BehaviorSubject<BirthdayListParamsModel>= new BehaviorSubject(this.params);
  //bList$:BehaviorSubject<Birthday[] | null>=new BehaviorSubject(this.bdays);

  constructor(private birthdayService:BirthdayService) { 
    
  }

  ngOnInit(): void {
    this.params$.pipe(  
      switchMap(p=>this.birthdayService.getListBirthdays())  
      )
      .pipe(untilDestroyed(this))
      .subscribe(b=>{
        this.bdays=b.items      
        
      //this.birthdayService.bList$.next(b.items)
    });
  
    
   
  }

  public ShowImageFromBlob(bday: Birthday) : string 
  {
    return this.birthdayService.ShowImageFromBlob(bday);
  } 


  onDelete(bday:Birthday){
    if(confirm("Are you sure to delete " + bday.name+"?")) {
     this.birthdayService.deleteBirthday(bday.id)
    .pipe(untilDestroyed(this))
    .subscribe(()=> {
      
      this.params$.next(this.params)
      //this.bList$.next(this.bdays)
    }) ;
    }    
  }  

}
