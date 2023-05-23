import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/Components/Header/header.component';
import { HomeComponent } from './Pages/Home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './Shared/Components/Footer/footer.component';
import { DashboardComponent } from './Pages/Dashboard/dashboard.component';
import { NewHomeComponent } from './Pages/NewHome/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvestmentComponent } from './Pages/investment/investment.component';
import { SettingComponent } from './Pages/setting/setting.component';
// import { NgImageSliderModule } from 'ng-image-slider/public_api';
import { DashboarddetailsComponent } from './Pages/dashboarddetails/dashboarddetails.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { InvestmentagreementComponent } from './Pages/docs/investmentagreement/investmentagreement.component';
import { DatePipe } from '@angular/common';
import { ProgramInfoComponent } from './Pages/docs/programInfo/program-info.component';
import { Tar7DocumentComponent } from './Pages/docs/tar7-document/tar7-document.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NewHomeComponent,
    FooterComponent,
    DashboardComponent,
    InvestmentComponent,
    SettingComponent,
    DashboarddetailsComponent,
    InvestmentagreementComponent,
    ProgramInfoComponent,
    Tar7DocumentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    })
    //  NgImageSliderModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
