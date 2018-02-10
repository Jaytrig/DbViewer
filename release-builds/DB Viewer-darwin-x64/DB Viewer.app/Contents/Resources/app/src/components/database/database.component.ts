import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import Dexie from 'dexie';
import * as moment from 'moment';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.scss']
})

export class DatabaseComponent extends Dexie implements OnInit {

    @Output() newData: EventEmitter<any>;
    @Input() database: any;
    @Input() name: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    DbName: string;
    allData: any[];
    displayedColumns;
    dataSource;

    constructor() {
        const dbName = 'DebugDB_' + moment().format('YYYYMMDD') + Math.random().toFixed(3).replace('.', '');
        super(dbName);
        // this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.newData = new EventEmitter();
        this.DbName = dbName;

        let DbArray: string[];

        const localStorageDbs: any = localStorage.getItem('Database');
        if (!localStorageDbs) {
            DbArray = [];
        } else {
            DbArray = JSON.parse(localStorageDbs);
        }
        DbArray.push(dbName);
        localStorage.setItem('Database', JSON.stringify(DbArray));
    }

    ngOnInit() {
        this.version(1).stores(this.database.Schema);
        Promise.all(this.tables.map(table => {
            const data = this.database.Database[table.name];
            return data.map((val) => {
                return this.table(table.name).put(val);
            });
        })).then(() => {
            return Promise.all(this.tables.map(table => {
                return Promise.all([table.name, this.table(table.name).toArray()]);
            }));
        }).then((results) => {
            // this.allData = results;
            this.table('errors').toArray().then((data) => {
                this.newData.emit(data);
            });

            this.allData = results.map(result => {
                if (result[1].length) {
                    return {
                        name: result[0],
                        keys: Object.keys(result[1][0]),
                        values: result[1]
                    };
                } else {
                    return {
                        name: result[0],
                        keys: [],
                        values: []
                    };
                }
            });

            console.log(this.allData);

            this.displayedColumns = this.allData[0].keys;
            this.dataSource = new MatTableDataSource(this.allData[0].values);
            this.dataSource.paginator = this.paginator;
        });
    }



    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    showTable(data) {
        this.displayedColumns = data.keys;
        this.dataSource = new MatTableDataSource(data.values);
        this.dataSource.paginator = this.paginator;
    }
}