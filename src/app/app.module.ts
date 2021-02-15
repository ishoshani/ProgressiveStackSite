import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { StackCardComponent } from './stack-card/stack-card.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { StackViewComponent } from './stack-view/stack-view.component';
import { RoombuilderComponent } from './roombuilder/roombuilder.component';
import { TagMakerComponent } from './tag-maker/tag-maker.component';
import { FacilitatorViewComponent } from './facilitator-view/facilitator-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    StackCardComponent,
    ProfileViewComponent,
    StackViewComponent,
    RoombuilderComponent,
    TagMakerComponent,
    FacilitatorViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
