import { BirthdayService } from './../services/birthday.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Birthday } from '../models/BirthdayModel';


@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.scss']
})

@UntilDestroy()
export class BirthdayComponent implements OnInit {

  @Output() newListEmiter:EventEmitter<any> = new EventEmitter<any>();

  @Input() bdays:any;
  @Input() total:number = 100;
  
  limit:number= this.birthdayService.limitDefault;
  offset:number = 0;
  pageNumber:number =1;
  
  params={
    limit: this.limit, 
    offset: this.offset,
    searchWord:''
  };

  
  constructor(private birthdayService: BirthdayService) { }

  ngOnInit(): void {
  }

  onDelete(bday:Birthday){
    if(confirm("Are you sure to delete " + bday.name+"?")) {
     this.birthdayService.deleteBirthday(bday.id)
    .pipe(untilDestroyed(this))
    .subscribe(()=> {      
      this.newListEmiter.emit(this.params)
    }) ;
    }    
  }  

  onPageNumber(page:number){
    this.params.offset=(page-1)*this.params.limit;
    this.birthdayService.params$.next(this.params);
    this.newListEmiter.emit(this.params);  
   

  }

  onPageSize(pageSize:number){
    
    this.params.limit=pageSize;
    this.params.offset=0;
    this.birthdayService.params$.next(this.params);
    this.newListEmiter.emit(this.params);  
  }

  public ShowImageFromBlob(bday: Birthday) : string 
  {
    return this.birthdayService.ShowImageFromBlob(bday);
  } 

  ngOnDestroy(){
    this.params.offset = 0;
    this.birthdayService.params$.next(this.params);
  }


}
