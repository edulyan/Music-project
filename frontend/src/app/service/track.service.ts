import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../models/comment.interface';
import { ITrack } from '../models/track.inteface';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  URL: string = 'http://localhost:5001';

  public getAll(): Observable<ITrack[]> {
    return this.http.get<ITrack[]>(`${this.URL}/api/Track`) as Observable<
      ITrack[]
    >;
  }

  public getById(id: number): Observable<ITrack> {
    return this.http.get<ITrack>(
      `${this.URL}/api/Track/` + id
    ) as Observable<ITrack>;
  }

  public getCommentByTrack(id: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(
      `${this.URL}/comments/track/` + id
    ) as Observable<IComment[]>;
  }

  public search(name: string): Observable<ITrack[]> {
    return this.http.get<ITrack[]>(
      `${this.URL}/search?name=` + name
    ) as Observable<ITrack[]>;
  }

  public post(track: ITrack, picF: File, audF: File): Observable<ITrack> {
    return this.http.post<ITrack>(`${this.URL}/api/Track`, {
      track,
      picF,
      audF,
    }) as Observable<ITrack>;
  }

  public postComment(id: number, comment: IComment): Observable<IComment> {
    console.log(comment);

    return this.http.post<IComment>(`${this.URL}/addComment/${id}/Track`, {
      id,
      comment,
    }) as Observable<IComment>;
  }

  public remove(id: number): Observable<any> {
    return this.http.delete<ITrack>(`${this.URL}/api/Track/` + id);
  }
}
