import { BirthdayService } from './../services/birthday.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  bday:any;
  constructor(private birthdayService: BirthdayService) { }

  ngOnInit(): void {
  }

  // onGet(){
  //   let sub= this.birthdayService.getBirthday(20)
  //   .subscribe(b=>{this.bday=b;
  //   console.log(this.bday)
  //   });
    
  // }

}
