import {Component, Input, OnInit} from '@angular/core';
import { navItems } from './_nav';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  navItems: any[] = [];
  sidebarActive = true;

  constructor() { }

  ngOnInit() {
    this.navItems = navItems;
  }

  onSidebarActive() {
    this.sidebarActive = !this.sidebarActive;
  }

}
