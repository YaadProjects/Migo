import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicPageModule } from 'ionic-angular';
import { NewTripFormComponent } from './new-trip-form.component';

@NgModule({
  declarations: [
    NewTripFormComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicPageModule.forChild(NewTripFormComponent),
  ],
  exports: [
    NewTripFormComponent
  ]
})
export class NewTripFormModule {}
