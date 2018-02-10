import {
    Component, OnInit, Input, SimpleChanges, ChangeDetectorRef,
    ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList
} from '@angular/core';
import Dexie from 'dexie';
import { error } from 'util';
import { setTimeout } from 'timers';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-error',
    templateUrl: 'error.component.html'
})

export class ErrorComponent implements OnInit {
    @Input() errors: any[];
    @ViewChild(BaseChartDirective) private _chart: BaseChartDirective;
    public pieChartType = 'pie';
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public chartColors: any[] = [{ 'backgroundColor': [] }];

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit() { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges(changes: SimpleChanges) {
        const labels = {};

        // this.pieChartData = [];
        this.pieChartData.length = 0;
        // this.pieChartLabels = [];
        this.pieChartLabels.length = 0;
        // this.chartColors[0].backgroundColor = [];
        this.chartColors[0].backgroundColor.length = 0;

        this.errors.map(err => {
            const val = JSON.parse(err.error);
            labels[val[0]] = labels[val[0]] + 1 || 1;
        });

        // this._ngZone.run(() => {
        Object.keys(labels).map(key => {
            this.pieChartLabels.push(key);
            this.pieChartData.push(labels[key]);
            this.chartColors[0].backgroundColor.push(this.getRandomColor());
        });

        setTimeout(() => {
            (<any>this._chart).refresh();
        }, 100);

    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
