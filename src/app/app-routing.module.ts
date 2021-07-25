import { EditComponent } from './edit/edit.component';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';
import { ListComponent } from './list/list.component';
import { NextComponent } from './next/next.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'next'
  },
  {
    path: 'next',
    component: NextComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddBirthdayComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent,    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
