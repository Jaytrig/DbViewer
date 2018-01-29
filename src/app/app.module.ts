import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ElectronService } from 'ngx-electron';
import { Ng2DraggableModule } from 'ng2-draggable';

import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { DbViewerComponent } from '../components/dbviewer/db-viewer.component';
import { ErrorComponent } from '../components/errors/error.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { DatabaseComponent } from '../components/database/database.component';

import { ToolbarTiltePipe } from '../pipe/toolbar-title.pipe';
import { CapitalizePipe } from '../pipe/capitalize.pipe';



@NgModule({
  declarations: [
    AppComponent,
    DbViewerComponent,
    ErrorComponent,
    SettingsComponent,
    DatabaseComponent,
    ToolbarTiltePipe,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2DraggableModule,
    SidebarModule,
    RouterModule.forRoot(routes),
    TabViewModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ElectronService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
