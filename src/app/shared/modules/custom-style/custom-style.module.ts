import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatListModule, MatCardModule, MatTableModule, MatDialogModule, MatSelectModule, MatBadgeModule,
  MatExpansionModule, MatRadioModule, MatGridListModule, MatTooltipModule, MatSliderModule, MatCheckboxModule, MatSnackBarModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatBadgeModule,
    MatRadioModule,
    MatGridListModule,
    MatExpansionModule,
    CdkTableModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatBadgeModule,
    MatRadioModule,
    MatExpansionModule,
    CdkTableModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class CustomStyleModule { }
