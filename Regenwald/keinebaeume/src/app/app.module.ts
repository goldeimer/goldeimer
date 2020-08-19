import { PersonalCounterComponent } from './personal-counter-component/personal-counter.component';
import { ColorPanelComponent } from './color-panel-component/color-panel.component';
import { ResCounterComponent } from './res-counter-component/res-counter.component';
import { PeopleCounterComponent } from './people-counter-component/people-counter.component';
import { ImageComponent } from './image-component/image.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoSectionComponent } from './logosection-component/logosection.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CommonModule } from '@angular/common';
import { CountUpModule } from 'ngx-countup';


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    LogoSectionComponent,
    PeopleCounterComponent,
    ResCounterComponent,
    ColorPanelComponent,
    PersonalCounterComponent,
  
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DeviceDetectorModule,
    CommonModule,
    CountUpModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
