import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceModule } from '../auth-service/auth-service.module'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthServiceModule
  ],
  declarations: [LandingPageComponent]
})
export class LandingPageModule { }
