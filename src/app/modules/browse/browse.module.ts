import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BrowseComponent
  ],
  declarations: [BrowseComponent, MenuComponent]
})
export class BrowseModule { }
