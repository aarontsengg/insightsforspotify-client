import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TracksPageComponent } from './components/tracks-page/tracks-page.component';
import { ArtistsPageComponent } from './components/artists-page/artists-page.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'tracks-page', component: TracksPageComponent },
    { path: 'artists-page', component: ArtistsPageComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent },
];
