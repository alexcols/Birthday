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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
