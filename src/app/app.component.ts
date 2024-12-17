import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'insightsforspotify';
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    if (!this.spotifyService) {
      window.location.href = '/login';
    }
  }
}
