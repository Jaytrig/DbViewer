import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import Dexie from 'dexie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  toolbarTitle = '';
  page = 'home';

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

  errors: any[];

  constructor(private es: ElectronService, private cd: ChangeDetectorRef) {
    this.errors = [];
  }

  openPage(route) {
    this.page = route;
  }

  getErrors(newErrors) {
    this.errors = [...this.errors, ...newErrors];
    this.cd.detectChanges();
  }



  ngOnInit() {
    let DbArray: string[];
    const localStorageDbs: any = localStorage.getItem('Database');

    if (!localStorageDbs) {
      DbArray = [];
    } else {
      DbArray = JSON.parse(localStorageDbs);
    }

    localStorage.setItem('Database', '');
    DbArray.map(dbName => {
      indexedDB.deleteDatabase(dbName);
    });

  }
}
