import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private spotifyService: SpotifyService, @Inject(PLATFORM_ID) private platformId: any) {}
  isLoggedIn = false;
  isDarkMode = false;
  private handleOAuthCallback(): void {
    if (isPlatformBrowser(this.platformId)) {
      const hash = window.location.hash;

      if (hash) {
        // Extract the access token from the URL
        const tokenMatch = hash.match(/access_token=([^&]*)/);
        if (tokenMatch) {
          const accessToken = tokenMatch[1];
          console.log('Access Token:', accessToken);

          // Save the token to the SpotifyService for future API calls
          this.spotifyService.setAccessToken(accessToken);

          // Clean up the URL
          window.history.replaceState({}, document.title, '/');

          // Update login status
          this.isLoggedIn = true;
        }
      }
    }
  }

  private checkLoginStatus(): void {
    this.isLoggedIn = this.spotifyService.hasAccessToken();
  }

  ngOnInit(): void {
    this.handleOAuthCallback();
    this.checkLoginStatus();
  }
  toggleDarkMode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isDarkMode = isChecked;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  navigateToHomePage(): void {
    this.router.navigate(['/']);
  }

  navigateToTracksPage(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/tracks-page']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToArtistsPage(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/artists-page']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
