import { BirthdayService } from './../services/birthday.service';
import { Birthday } from './../models/BirthdayModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})
export class NextComponent implements OnInit {

  bdays:Birthday[]=[];
  limit:number=10;

  constructor(private birthdayServise:BirthdayService) { }

  ngOnInit(): void {
    this.birthdayServise.getNextBirthdays(this.limit)
    .subscribe(birthdays=>{
      this.bdays=birthdays,
      console.log('next', this.bdays);
      
    });
  }

}
