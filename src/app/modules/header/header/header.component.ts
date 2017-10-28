import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  open = false;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  @HostListener('document:click', ['$event'])
  closeDropDown(event): void {
    console.log(event.target.classList);
    if (!event.target.classList.contains('hampart')) {
      this.open = false;
    }
  }
}
