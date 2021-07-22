import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Output()
  date:EventEmitter<Date>=new EventEmitter();

  form = new FormGroup({
    datepicker : new FormControl()
  });
  constructor() { }

  ngOnInit(): void {

    this.form.valueChanges.subscribe(val=>{
      console.log('picker',val);
            
      if(val.datepicker.toString() !== "Invalid Date") {
        this.date.emit(val.datepicker)
      }
    }
    
      )

  }

}
