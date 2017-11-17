import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AudioFeatures } from '../../interfaces/tracks';
import { MapItem } from '../../shared/bar-chart/bar-chart.component';
import { PlaylistItem } from '../../interfaces/playlists';
import { ArtistItem } from '../../interfaces/artists';
import { Track } from '../../interfaces/tracks';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnChanges {

  @Input() tracks: Array<Track>;
  @Input() allArtists: Array<ArtistItem> = [];
  avaragedFeatures: AudioFeatures;
  weightedGenres: Array<MapItem>;

  constructor() { }

  ngOnChanges() {
    if (this.tracks != null && this.tracks.length > 0) {
      this.setGenres();
      this.calculateFeatureInfo();
    }
  }

  setGenres() {
    const artistIds = this.tracks
      .map(track => track.artists
        .map(artist => artist.id))
      .reduce((a, c) => a.concat(c), []);
    const relevantArtists = this.allArtists.filter(artist => artistIds.findIndex(id => id === artist.id) >= 0);
    const genres: Array<MapItem> = [];

    relevantArtists.forEach(artist => artist.genres.forEach(genre => {
      const item = genres.find(x => x.key === genre);

      if (item) {
        item.value += 1;
      } else {
        genres.push({key: genre, value: 1, normalizedValue: 0});
      }
    }));

    const maxValue = genres.reduce((a, c) =>  c.value > a ? c.value : a, 0);

    genres.forEach(genre => {
      genre.normalizedValue = genre.value / maxValue;
    });

    this.weightedGenres = genres.sort((a, b) => b.normalizedValue - a.normalizedValue);
  }

  calculateFeatureInfo() {
    const features = <AudioFeatures>{};

    features.danceability = this.tracks
      .map(track => track.audioFeatures.danceability)
      .reduce((a, c) => c += a, 0) / this.tracks.length;

    features.energy = this.tracks
      .map(track => track.audioFeatures.energy)
      .reduce((a, c) => c += a, 0) / this.tracks.length;

    features.speechiness = this.tracks
      .map(track => track.audioFeatures.speechiness)
      .reduce((a, c) => c += a, 0) / this.tracks.length;

    features.acousticness = this.tracks
      .map(track => track.audioFeatures.acousticness)
      .reduce((a, c) => c += a, 0) / this.tracks.length;

    features.instrumentalness = this.tracks
      .map(track => track.audioFeatures.instrumentalness)
      .reduce((a, c) => c += a, 0) / this.tracks.length;

    features.liveness = this.tracks
      .map(track => track.audioFeatures.liveness)
      .reduce((a, c) => c += a, 0) / this.tracks.length;

    features.valence = this.tracks
      .map(track => track.audioFeatures.valence)
      .reduce((a, c) => c += a, 0) / this.tracks.length;

    this.avaragedFeatures = features;
  }
}
