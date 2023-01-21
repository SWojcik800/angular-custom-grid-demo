import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'; 
import { CustomColumnComponent, CustomTableComponent } from './components';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    CustomTableComponent,
    CustomColumnComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule
  ],
  exports: [
    CustomTableComponent,
    CustomColumnComponent
  ]
})
export class CustomTableModule { }
