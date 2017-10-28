import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth-service/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AuthService]
})
export class AuthServiceModule { }
