import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  toolbarTitle = '';

  menu: Array<{ route: string, icon: string, classes: string }> = [
    {
      route: 'home',
      icon: 'fa-database',
      classes: ''
    },
    {
      route: 'error',
      icon: 'fa-exclamation-triangle',
      classes: ''
    },
    {
      route: 'settings',
      icon: 'fa-cog',
      classes: 'sidebar-item-bottom'
    },
  ];

  constructor(private es: ElectronService, private cd: ChangeDetectorRef, public router: Router, private ar: ActivatedRoute) {
  }


  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.ar)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.toolbarTitle = event['title']);

  }
}
