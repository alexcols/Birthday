import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BirthdayService } from './../services/birthday.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BirthdayRequest } from '../models/BirthdayRequest';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

@UntilDestroy()
export class EditComponent implements OnInit {

  birthday:any;
  id:number = 0;
  bsValue = new Date();

  constructor(
    private route:ActivatedRoute,
    private birthdayService: BirthdayService) { }

  ngOnInit(): void {
    this.route.params
    .pipe(untilDestroyed(this))
    .subscribe((params:Params) => (
      this.id=params.id      
    ));
    this.birthdayService.getBirthday(this.id)
    .pipe(untilDestroyed(this))
    .subscribe(b=>this.birthday=b)     
  }

}
