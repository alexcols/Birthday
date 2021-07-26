import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BirthdayService } from '../services/birthday.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
@UntilDestroy()
export class PaginationComponent implements OnInit {

  @Output() pageNumber:EventEmitter<number>=new EventEmitter();
  @Output() pageSizeEmit:EventEmitter<number>= new EventEmitter();

  @Input() public page=1;
  @Input() public pageSize = this.birthdayService.limitDefault;
  @Input() public collectionSize:number=0;
  
  bDaysListParams={
    limit: this.pageSize,
    offset: 0    
  }

  form:FormGroup=new FormGroup({
    bDaysOnPage: new FormControl(
      this.pageSize,
      [        
        Validators.min(1),
        Validators.max(50),
        Validators.pattern("[0-9]{1,}")
      ]
      )
  })
  
  constructor(private birthdayService:BirthdayService) { }

  ngOnInit(): void {  
    
    this.birthdayService.paginationTotal$
    .pipe(untilDestroyed(this))
    .subscribe(t=>{
      console.log('total pagination', t, this.page);      
      this.collectionSize=t
    });
   }

  onPageChange(page:number){    
    this.pageNumber.emit(page);  

    this.page=page;
    
  }

  onKey(){       
    
    const pageSize=this.form.value.bDaysOnPage;
    
    this.pageSize=Number(pageSize);
   
    this.pageSizeEmit.emit(Number(this.form.value.bDaysOnPage));

    this.page=1;
    this.bDaysListParams.limit=this.pageSize;
    this.bDaysListParams.offset=0;   
  }

  ngOnDestroy(){    
    
     this.bDaysListParams.offset=0;
     this.birthdayService.limitDefault=this.pageSize;
    
  }

}
