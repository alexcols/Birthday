import { Birthday } from './../models/BirthdayModel';
import { BirthdayRequest } from './../models/BirthdayRequest';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, RouterEvent, NavigationEnd, RoutesRecognized } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BirthdayService } from '../services/birthday.service';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})

@UntilDestroy()
export class EditFormComponent implements OnInit {

  selectedImageFile : File | any = null;
  imagePreview: any =null;
    
  bbday: BirthdayRequest | any = null;

  date:Date = new Date();  

  id:number = 0;

  previousUrl= this.birthdayService.previousUrl;
 
  addBirthdayForm:FormGroup;
    
  constructor(
    private birthdayService: BirthdayService, 
    private router: Router,
    private route: ActivatedRoute
    ) { 
   
    
    this.addBirthdayForm=new FormGroup({
        name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern("[a-zA-Zа-яА-Я-_ 0-9]{1,}")
      ]),
        secondName: new FormControl('',
        [
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern("[a-zA-Zа-яА-Я-_ 0-9]{1,}")
        ]),
        image: new FormControl()
    });



  }

  ngOnInit(): void {


   
    
    this.route.params
    .pipe(untilDestroyed(this))
    .subscribe((params:Params) => (
      this.id=params.id                  
    ));

    var sub = this.birthdayService.getBirthday(this.id)
    .pipe(untilDestroyed(this))
    .subscribe(b=>(
      this.bbday=b,     
      this.updateFormData(),
      this.date = b.date      
      ))       
  }
 
  onClick(){
    const bday = new FormData();
    const formValue = this.addBirthdayForm.value;
    
    if (this.id !== null || this.id !==0)
    bday.append('Id', this.id.toString())
    
    bday.append('Name', formValue.name);
    
    if(formValue.secondName !== null)
    bday.append('SecondName', formValue.secondName);
  
    bday.append('Birthday', this.bbday.birthday);

    if (this.selectedImageFile !== null)
    bday.append('Image', this.selectedImageFile, this.selectedImageFile.name);
   
    this.birthdayService.editBirthday(bday)
    .pipe(untilDestroyed(this))
    .subscribe(
      ()=> {     
      this.router.navigateByUrl(this.previousUrl)      
      });    
    
  }

  updateFormData()
  {
    this.addBirthdayForm.controls['name'].setValue(this.bbday.name);
    this.addBirthdayForm.controls['secondName'].setValue(this.bbday.secondName);  
    
  }

  dateCatcher(date:Date){    
    
    this.bbday.birthday = date.getFullYear()+'-'+ (date.getMonth()+1)+'-'+ date.getDate();    
        
  }

  onFileUpload(event : any){
    this.selectedImageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => { this.imagePreview = reader.result; };
    reader.readAsDataURL(this.selectedImageFile);
  }

  public ShowImageFromBlob(bday: Birthday) : string 
  {
    return this.birthdayService.ShowImageFromBlob(bday);
  } 


}
