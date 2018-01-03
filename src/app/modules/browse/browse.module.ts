import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BrowseComponent
  ],
  declarations: [BrowseComponent, MenuComponent]
})
export class BrowseModule { }
