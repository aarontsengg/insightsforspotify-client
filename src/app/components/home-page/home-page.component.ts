import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private spotifyService: SpotifyService, private router: Router) {}
  userProfile: any = null;
  isLoggedIn = false;

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = this.spotifyService.getAccessToken();
    if (token) {
      this.isLoggedIn = true;
      this.fetchUserProfile();
    }
  }

  fetchUserProfile(): void {
    this.spotifyService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      }
    });
  }


  login(): void {
    const clientId = '294a62ce86ad415895b2085f45454445';
    const redirectUri = 'http://localhost:4200';
    const scopes = 'user-top-read';

    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&response_type=token`;

    window.location.href = authUrl; // Redirect to Spotify Auth
  }
}
