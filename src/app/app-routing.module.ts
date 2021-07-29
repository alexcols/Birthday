import { FindListComponent } from './find-list/find-list.component';
import { ListBirthdayComponent } from './list-birthday/list-birthday.component';
import { EditComponent } from './edit/edit.component';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';
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
    component: ListBirthdayComponent
  },
  {
    path: 'add',
    component: AddBirthdayComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent   
  },
  {
    path: 'find',
    component: FindListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
