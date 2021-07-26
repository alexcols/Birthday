import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BirthdayListParamsModel } from '../models/BirthdayListParamsModel';
import { Birthday } from '../models/BirthdayModel';
import { BirthdayService } from '../services/birthday.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
@UntilDestroy()
export class ListComponent implements OnInit {



  
  constructor(private birthdayService:BirthdayService) { }

  ngOnInit(): void {
    
  }

}
