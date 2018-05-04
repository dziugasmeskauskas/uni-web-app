import { JokeListComponent } from './joke-list/joke-list.component';
import { JokeComponent } from './joke/joke.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/jokes', pathMatch: 'full' },
  { path: 'jokes', component: JokeListComponent},
  { path: 'jokes/:id', component: JokeComponent },
  { path: 'createjoke', component: JokeComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
