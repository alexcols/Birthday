
import { BirthdayService } from './../services/birthday.service';
import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.scss']
})

@UntilDestroy()
export class AddBirthdayComponent implements OnInit {

  // birthday:BirthdayRequest={};

  selectedImageFile : File | any = null;
  imagePreview: any;
  bbday:any = null;
  
  
  date = new Date();
 
  

  addBirthdayForm:FormGroup;
    
  constructor(private birthdayService: BirthdayService, private router: Router) { 
   
    
    this.addBirthdayForm=new FormGroup({
        name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern("[a-zA-Zа-яА-Я-_ 0-9]{1,}")
      ]),
        secondName: new FormControl(),
        image: new FormControl()
    });
   
  }

  ngOnInit(): void {
   
  }
 

  onClick(){
    const bday = new FormData();
    const formValue = this.addBirthdayForm.value;
    bday.append('Name', formValue.name);
    if(formValue.secondName !== null)
    bday.append('SecondName', formValue.secondName);

    bday.append('Birthday', this.bbday);
    if (this.selectedImageFile !== null)
    bday.append('Image', this.selectedImageFile, this.selectedImageFile.name);
   
  
    // this.birthday.Name = this.addBirthdayForm.value.name;
    this.birthdayService.postBirthday(bday)
    .pipe(untilDestroyed(this))
    .subscribe(()=> this.router.navigateByUrl(''));    
    
  }

  dateCatcher(date:Date){    
    
    this.bbday = date.getFullYear()+'-'+ (date.getMonth()+1)+'-'+ date.getDate();
   
        
  }

  onFileUpload(event : any){
    this.selectedImageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => { this.imagePreview = reader.result; };
    reader.readAsDataURL(this.selectedImageFile);
  }

}
