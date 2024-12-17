import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-tracks-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit {
  tracks: any[] = [];
  loading = true;
  selectedTimeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term';

  // Time ranges to display
  timeRanges = [
    { label: 'Last 4 Weeks', value: 'short_term' },
    { label: 'Last 6 Months', value: 'medium_term' },
    { label: 'All Time', value: 'long_term' }
  ];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.fetchTopTracks();
  }

  fetchTopTracks(): void {
    this.loading = true;
    this.spotifyService.getTopTracks(this.selectedTimeRange).subscribe({
      next: (response) => {
        console.log('Spotify API Response:', response); // Debugging log
        this.tracks = response.items.map((track: any) => ({
          name: track.name,
          artist: track.artists.map((artist: any) => artist.name).join(', '), // Combine all artists
          album: track.album.name,
          image: track.album.images[0]?.url,
          url: track.external_urls.spotify
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching top tracks:', err); // Log the error
        this.loading = false;
      }
    });
  }

  onTimeRangeChange(event: any): void {
    this.selectedTimeRange = event.target.value;
    this.fetchTopTracks();
  }
}