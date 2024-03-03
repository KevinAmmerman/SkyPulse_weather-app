import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SavedLocationsComponent } from './saved-locations/saved-locations.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'saved-locations', component: SavedLocationsComponent }
];
