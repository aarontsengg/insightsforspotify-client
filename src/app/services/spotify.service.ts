import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) { }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  // Helper to generate authorization headers
  private getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
  }

  // Get user's top tracks
  getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term'): Observable<any> {
    return this.http.get(`${this.baseUrl}/me/top/tracks`, { 
      headers: this.getAuthorizationHeaders(),
      params: { time_range: timeRange, limit: 20 }
    });
  }

  // Get user's top artists
  getTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term'): Observable<any> {
    return this.http.get(`${this.baseUrl}/me/top/artists`, { 
      headers: this.getAuthorizationHeaders(),
      params: { time_range: timeRange, limit: 20 }
    });
  }

  // Check if the user has an access token
  hasAccessToken(): boolean {
    return !!this.accessToken;
  }

  // Get the access token
  getAccessToken(): string | null {
    return this.accessToken;
  }

  // Get user profile
  getUserProfile(): Observable<any> {
    const url = 'https://api.spotify.com/v1/me';
    return this.http.get(url, {
      headers: this.getAuthorizationHeaders()
    });
  }
  
}
