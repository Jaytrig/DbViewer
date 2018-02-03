import { Component, OnInit, Input } from '@angular/core';
import Dexie from 'dexie';
import * as moment from 'moment';

@Component({
    selector: 'app-database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.scss']
})

export class DatabaseComponent extends Dexie implements OnInit {

    @Input() database: any;
    @Input() name: string;
    constructor() {
        super(moment().format('YYYYMMDDHHSS'));

    }

    ngOnInit() {
        console.log(this.database);
        this.version(1).stores(this.database.Schema);
        console.log(this);
        Promise.all(this.tables.map(table => {
            const data = this.database.Database[table.name];
            return data.map((val) => {
                return this.table(table.name).add(data, data.id);
            });
        })).then(() => {
            Promise.all(this.tables.map(table => {
                return this.table(table.name).toArray();
            })).then((data) => {
                console.log(data);
            });
        });
    }
}
