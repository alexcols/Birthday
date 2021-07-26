import { BirthdayRequest } from './../models/BirthdayRequest';
import { BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BirthdayService } from './../services/birthday.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

@UntilDestroy()
export class EditComponent implements OnInit {

  birthday:BirthdayRequest | any =null;
 
  id:number = 0;
  bsValue = new Date();

  constructor(
    private route:ActivatedRoute,
    private birthdayService: BirthdayService) { }

  ngOnInit(): void {}   

}
