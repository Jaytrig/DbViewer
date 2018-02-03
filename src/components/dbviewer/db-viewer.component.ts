import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-db-viewer',
    templateUrl: 'db-viewer.component.html',
    styleUrls: ['db-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DbViewerComponent implements OnInit {

    databases: any[];
    tabs: any[];

    constructor(private es: ElectronService, public cd: ChangeDetectorRef) {


    }

    handleClose(evt) {
        if (evt.index > -1) {
            this.tabs.splice(evt.index, 1);
        }
        this.cd.detectChanges();
    }

    tabClick() {
        this.cd.detectChanges();
    }

    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
        this.cd.detectChanges();
    }

    click() {
        console.log('click');
    }

    ngOnInit() {

        if (this.es.isElectronApp) {
            this.es.ipcRenderer.on('fileData', (...args) => {
                const sender = args[0];
                const value = args[1];
                let fileName: string = args[2];
                fileName = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.lastIndexOf('.'));

                const database = JSON.parse(value.toString());
                this.tabs.push({
                    header: fileName,
                    database: database
                });

                setTimeout(() => {
                    this.cd.detectChanges();
                }, 1000);

            });
        }

        if (this.es.isElectronApp) {
            this.tabs = [];
        } else {
            this.tabs = [{ 'header': 'json 1', 'database': { body: 'test' } }, { 'header': 'json 2', 'database': { body: 'test 2' } }];
        }

    }

}
