import { BirthdayListParamsModel } from './../models/BirthdayListParamsModel';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { BirthdayService } from './../services/birthday.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@UntilDestroy()
export class HeaderComponent implements OnInit {

  bday:any;

  params : BirthdayListParamsModel={
    limit: 100, 
    offset: 0,
    searchWord:''
  };

  findForm= new FormGroup({
    searchInput: new FormControl(
      '',
      [
       Validators.required,
       Validators.minLength(2),
       //Validators.maxLength(25),
       //Validators.pattern("[a-zA-Zа-яА-Я-_ 0-9]{1,}")
      ]
    )
  });
  
  constructor(private birthdayService: BirthdayService,
    private router:Router) { }

  ngOnInit(): void {
  
      
  }

  onFind(){
    const formValue = this.findForm.value;
    this.params.searchWord = formValue.searchInput;
    this.birthdayService.params$.next(this.params);
    this.birthdayService.searchWord$.next(this.params.searchWord);   

    this.router.navigate(['find'])
  }

}
