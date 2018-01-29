import { Routes, RouterModule } from '@angular/router';
import { DbViewerComponent } from '../components/dbviewer/db-viewer.component';
import { ErrorComponent } from '../components/errors/error.component';
import { SettingsComponent } from '../components/settings/settings.component';

export const routes: Routes = [
    { path: 'home', component: DbViewerComponent, data: { title: 'Database Viewer' } },
    { path: 'error', component: ErrorComponent, data: { title: 'Errors' } },
    { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
    { path: '', pathMatch: 'full', redirectTo: 'home' }
];
