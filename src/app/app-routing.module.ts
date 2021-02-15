import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilitatorViewComponent } from './facilitator-view/facilitator-view.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { StackViewComponent } from './stack-view/stack-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {path: 'main', component: MainViewComponent},
  {path: 'stack/:id', component: StackViewComponent},
  {path: 'stack/:id/facilitator', component: FacilitatorViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
