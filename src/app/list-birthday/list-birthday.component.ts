import { Birthday } from './../models/BirthdayModel';
import { Component, Input, OnInit } from '@angular/core';
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
  limit:number= this.birthdayService.limitDefault;
  offset:number = 0;
  total:number = 100;
  pageNumber:number =1;
  
  params={limit: this.limit, 
          offset: this.offset};
  params$: BehaviorSubject<any>= new BehaviorSubject(this.params);
 
  constructor(private birthdayService:BirthdayService) { 
    
  }

  ngOnInit(): void {
    this.params$.pipe(  
      switchMap(p=>this.birthdayService.getListBirthdays())  
      )
      .pipe(untilDestroyed(this))
      .subscribe(b=>{
        this.bdays=b.items,
        this.total=b.total    
    });
       
  }  


  onDelete(bday:Birthday){
    if(confirm("Are you sure to delete " + bday.name+"?")) {
     this.birthdayService.deleteBirthday(bday.id)
    .pipe(untilDestroyed(this))
    .subscribe(()=> {      
      this.params$.next(this.params)     
    }) ;
    }    
  }  

  onPageNumber(page:number){
    this.params.offset=(page-1)*this.params.limit;
    this.birthdayService.params$.next(this.params);
    this.params$.next(this.params);  
   

  }

  onPageSize(pageSize:number){
    
    this.params.limit=pageSize;
    this.params.offset=0;
    this.birthdayService.params$.next(this.params);
    this.params$.next(this.params);  
  }

  public ShowImageFromBlob(bday: Birthday) : string 
  {
    return this.birthdayService.ShowImageFromBlob(bday);
  } 

}
