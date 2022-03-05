import { NgModule } from '@angular/core';
import { CreateComponent } from './create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    NgxMatFileInputModule,
  ],
  exports: [
    CreateComponent,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
})
export class CreateModule {}
