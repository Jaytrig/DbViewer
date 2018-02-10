import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { TabViewModule } from 'primeng/tabview';

import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { ElectronService } from 'ngx-electron';
import { Ng2DraggableModule } from 'ng2-draggable';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { DbViewerComponent } from '../components/dbviewer/db-viewer.component';
import { ErrorComponent } from '../components/errors/error.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { DatabaseComponent } from '../components/database/database.component';

import { ToolbarTiltePipe } from '../pipe/toolbar-title.pipe';
import { CapitalizePipe } from '../pipe/capitalize.pipe';
import { LineChartComponent } from '../components/errors/charts/line-chart';



@NgModule({
  declarations: [
    AppComponent,
    DbViewerComponent,
    ErrorComponent,
    SettingsComponent,
    DatabaseComponent,
    ToolbarTiltePipe,
    CapitalizePipe,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2DraggableModule,
    SidebarModule,
    TabViewModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    ChartsModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [
    ElectronService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
