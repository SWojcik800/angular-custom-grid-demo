import { ContentChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomColumnComponent } from '../custom-column/custom-column.component';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @ContentChildren(CustomColumnComponent) columns!: QueryList<CustomColumnComponent>;


  public get displayedColumns() {
    return this.columns.map((x) => x.fieldName);
  }
  constructor() { }

 

}
