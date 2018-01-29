import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.scss']
})

export class DatabaseComponent implements OnInit {

    @Input() database: any;
    constructor() { }

    ngOnInit() {
        console.log(this.database);
    }
}
