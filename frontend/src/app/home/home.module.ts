import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateModule } from '../create/create.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  exports: [HomeComponent],
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CreateModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSliderModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
})
export class HomeModule {}
