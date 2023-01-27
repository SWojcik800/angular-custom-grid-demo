import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {  CustomTableComponent } from './components';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppColumnDirective } from './directives/app-column.directive';
import { ColumnDefinitionsDirective } from './directives/app-column-definitions.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CustomTableComponent,
    AppColumnDirective,
    ColumnDefinitionsDirective
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CustomTableComponent,
    AppColumnDirective,
    ColumnDefinitionsDirective
  ]
})
export class CustomTableModule { }
