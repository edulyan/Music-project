import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, pluck, switchMap } from 'rxjs';
import { IComment } from '../models/comment.interface';
import { ITrack } from '../models/track.inteface';
import { TrackService } from '../service/track.service';

@Component({
  selector: 'track-root',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  constructor(
    private trackService: TrackService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public newCommentModel: IComment = {} as IComment;

  public comment!: Observable<IComment[]>;

  public tracks$!: Observable<ITrack>;

  public id_page = +document.location.href.slice(-1);

  ngOnInit() {
    this.tracks$ = this.activatedRoute.params.pipe(
      pluck('id'),
      switchMap((id) => this.trackService.getById(id))
    );

    this.comment = this.trackService.getCommentByTrack(
      +document.location.href.slice(-1)
    );
  }

  getComments(id: number): Observable<IComment[]> {
    return this.trackService.getCommentByTrack(id);
  }

  addComment(id: number) {
    this.trackService
      .postComment(id, this.newCommentModel)
      .subscribe((data) => {
        console.log(data);
        this.getComments(id);
      });
  }
}
