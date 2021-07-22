import { Birthday } from './../models/BirthdayModel';
import { switchMap } from 'rxjs/operators';
import { BirthdayService } from './../services/birthday.service';
import { Component, OnInit } from '@angular/core';
import { MonthList } from '../models/MonthsList';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.scss']
})
export class AddBirthdayComponent implements OnInit {

  birthday:Birthday;

  months=[
    {
      month: 'January',
      order:1,
      days:31
    },
    {
      month: 'February',
      order:2,
      days:29
    }
  ];
   month:number | null =null;

   maxDay=0;
   days:number[]=[];

  addBirthdayForm:FormGroup;
    
  constructor(private birthdayService: BirthdayService) { 
    this.birthday={
      birthday: new Date(1),
      id: 0,
      name: 'string',
      secondName: 'string',
      day: 0,
      month: 0,
      age: 0,
      photoName: 'string',
      photoType: 'string',
      photoContent: 'string'

    }
    
    this.addBirthdayForm=new FormGroup({
        monthInput: new FormControl(),
        dayInput: new FormControl()
    });
   
  }

  ngOnInit(): void {
    

    this.addBirthdayForm.valueChanges
    .subscribe(val=>{
      console.log('vonth', val.monthInput.order);
      this.days=[];
      for (var i=0; i<val.monthInput.days; i++){
        this.days[i]=i+1
      }
    
     
    }
    );
    
    
    
  }

  dateCatcher(date:Date){    
    this.birthday.birthday = date;
    
    
  }

}
