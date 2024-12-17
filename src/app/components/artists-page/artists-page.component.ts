import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artists-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artists-page.component.html',
  styleUrl: './artists-page.component.css'
})
export class ArtistsPageComponent {
  artists: any[] = [];
  loading = true;
  selectedTimeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term';

  // Time Range Selector
  timeRanges = [
    { label: 'Last 4 Weeks', value: 'short_term' },
    { label: 'Last 6 Months', value: 'medium_term' },
    { label: 'All Time', value: 'long_term' }
  ];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.fetchTopArtists();
  }

  fetchTopArtists(): void {
    this.loading = true;
    this.spotifyService.getTopArtists(this.selectedTimeRange).subscribe({
      next: (response) => {
        this.artists = response.items.map((artist: any) => ({
          name: artist.name,
          genres: artist.genres.join(', ') || 'N/A',
          image: artist.images[0]?.url || 'assets/placeholder.png'
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching top artists:', err);
        this.loading = false;
      }
    });
  }

  onTimeRangeChange(event: any): void {
    this.selectedTimeRange = event.target.value;
    this.fetchTopArtists();
  }
}
