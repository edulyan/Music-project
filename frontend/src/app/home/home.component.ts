import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Howl } from 'howler';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { CreateComponent } from '../create/create.component';
import { ITrack } from '../models/track.inteface';
import { TrackService } from '../service/track.service';
import * as _ from 'lodash';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private trackService: TrackService,
    private matDialog: MatDialog
  ) {}

  public isLoading = false;

  public trackData = new BehaviorSubject<ITrack[]>([]);

  public tracks: ITrack = {} as ITrack;

  ngOnInit() {
    this.isLoading = true;
    this.trackService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((trackListItem) => this.trackData.next(trackListItem));
  }

  public getTrack(): Observable<ITrack[]> {
    return this.trackData.asObservable();
  }

  public searchTrack(query: string) {
    if (!query) {
      this.trackService
        .getAll()
        .subscribe((trackListItem) => this.trackData.next(trackListItem));
    } else {
      this.trackService
        .search(query)
        .subscribe((trackListItem) => this.trackData.next(trackListItem));
    }
  }

  create() {
    const ref = this.matDialog.open(CreateComponent, {
      width: '450px',
    });

    ref.afterClosed().subscribe((track: ITrack) => {
      if (track) {
        const list = this.trackData.getValue();
        list.push(track);
        this.trackData.next(_.cloneDeep(list));
      }
    });
  }

  delete(track: ITrack) {
    this.isLoading = true;
    this.trackService
      .remove(track.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        const list = this.trackData.getValue();
        _.remove(list, (post) => post.id === track.id);
        this.trackData.next(_.cloneDeep(list));
      });
  }

  activeTrack: ITrack = null as any;
  player: Howl = null as any;
  isPlaying: boolean = false;
  progress: number = 0;
  @ViewChild('range', { static: false }) range: any;

  play(track: ITrack) {
    if (this.player) {
      this.player.stop();
    }

    this.player = new Howl({
      src: ['http://localhost:5001/' + track.audioSrc],
      onplay: () => {
        console.log('onPlay');
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        console.log('onEnd');
      },
    });

    this.player.play();
  }

  togglePLayer(pause: any) {
    this.isPlaying = !pause;

    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  next() {
    let index = this.trackData.getValue().indexOf(this.activeTrack);

    if (index != this.trackData.getValue().length - 1) {
      this.play(this.trackData.getValue()[index + 1]);
    } else {
      this.play(this.trackData.next.prototype[0]);
    }
  }

  prev() {
    let index = this.trackData.getValue().indexOf(this.activeTrack);
    if (index > 0) {
      this.play(this.trackData.getValue()[index - 1]);
    } else {
      this.play(
        this.trackData.getValue()[this.trackData.getValue().length - 1]
      );
    }
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;

    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }
}
