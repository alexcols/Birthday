import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NextComponent } from './next/next.component';
import { ListComponent } from './list/list.component';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { EditComponent } from './edit/edit.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ListBirthdayComponent } from './list-birthday/list-birthday.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NextComponent,
    ListComponent,
    AddBirthdayComponent,
    DatepickerComponent,
    EditComponent,
    EditFormComponent,
    ListBirthdayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
