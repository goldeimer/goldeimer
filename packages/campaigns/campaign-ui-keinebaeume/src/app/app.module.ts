import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { DeviceDetectorModule } from 'ngx-device-detector'
import { CountUpModule } from 'ngx-countup'

import { SwipeButtonComponent } from './swipe-button-component/swipe-button.component'
import { PersonalCounterComponent } from './personal-counter-component/personal-counter.component'
import { ColorPanelComponent } from './color-panel-component/color-panel.component'
import { PeopleCounterComponent } from './people-counter-component/people-counter.component'
import { ResultDisplay } from './res-counter-component/res-counter.component'
import { ImageComponent } from './image-component/image.component'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LogoSectionComponent } from './logosection-component/logosection.component'

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        ImageComponent,
        LogoSectionComponent,
        PeopleCounterComponent,
        ResultDisplay,
        ColorPanelComponent,
        PersonalCounterComponent,
        SwipeButtonComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DeviceDetectorModule,
        CommonModule,
        CountUpModule,
        HttpClientModule
    ],
    providers: []
})

export class AppModule {}
