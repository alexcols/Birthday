import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

@UntilDestroy()

export class DatepickerComponent implements OnInit {

  @Output()
  date:EventEmitter<Date>=new EventEmitter();

  @Input()
  defaultValue: any;

  
  today = new Date();
  
  form:FormGroup;
  
  constructor( ) {     
     
      this.form = new FormGroup({
      datepicker : new FormControl()
    });
  }

  ngOnInit(): void { 

    this.form.valueChanges
    .pipe(untilDestroyed(this))
    .subscribe(val=>{                 
      if(val.datepicker.toString() !== "Invalid Date") {
        this.date.emit(val.datepicker)       
      }      
    });

  }

}
