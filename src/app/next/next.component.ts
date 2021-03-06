import { BirthdayService } from './../services/birthday.service';
import { Birthday } from './../models/BirthdayModel';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})

@UntilDestroy()

export class NextComponent implements OnInit {

  
  bdays:Birthday[]=[];
  limit:number=this.birthdayService.limitNext;
  form:FormGroup;
  lim$: BehaviorSubject<number>= new BehaviorSubject(this.limit);

  constructor(private birthdayService:BirthdayService) { 
    this.form=new FormGroup({
      bdaysOnPage: new FormControl(this.limit,        
          [        
            Validators.min(1),
            Validators.max(50),
            Validators.pattern("[0-9]{1,}")
          ]
        )
    });
    
  }

  ngOnInit(): void {
    this.lim$.pipe(  
      switchMap(limit=>this.birthdayService.getNextBirthdays(limit))  
      )
      .pipe(untilDestroyed(this))
      .subscribe(b=>{
        this.bdays=b.items});
   
  }


  onKey(){
    const limit=this.form.value.bdaysOnPage;    
    this.limit=Number(limit);
    this.lim$.next(this.limit);
    this.birthdayService.limitNext=this.limit;
  }

  onDelete(bday:Birthday){
    if(confirm("Are you sure to delete " + bday.name+"?")) {
     this.birthdayService.deleteBirthday(bday.id)
    .pipe(untilDestroyed(this))
    .subscribe(()=> this.lim$.next(this.limit)) ;
    }    
  }

  
  public ShowImageFromBlob(bday: Birthday) : string 
  {
    return this.birthdayService.ShowImageFromBlob(bday);
  } 

}


