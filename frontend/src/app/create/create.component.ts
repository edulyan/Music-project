import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, Observable } from 'rxjs';
import { ITrack } from '../models/track.inteface';
import { ITrackCreate } from '../models/trackCreate.interface';
import { TrackService } from '../service/track.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ITrackCreate>,
    private trackService: TrackService
  ) {}

  public isLoading = false;
  public isEditing = false;
  public picF: any;
  public audF: any;

  public newTrackModel: ITrack = {} as ITrack;

  ngOnInit(): void {}

  public create(form: NgForm) {
    if (form.valid) {
      console.log(this.newTrackModel)
      this.isLoading = true;
      this.handleAfterCreate(
        this.trackService.post(this.newTrackModel, this.picF, this.audF)
      );
    }
  }

  private handleAfterCreate(observable: Observable<ITrack>) {
    return observable
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((response) => {
        this.dialogRef.close(response);
      });
  }
}
