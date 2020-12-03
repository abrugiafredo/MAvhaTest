import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'review'
  },
  {
    path: 'review',
    loadChildren: () => import('./core/review/review.module').then(m => m.ReviewModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./core/confirmation/confirmation.module').then(m => m.ConfirmationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
