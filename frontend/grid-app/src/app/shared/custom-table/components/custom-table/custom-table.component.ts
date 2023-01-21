import { ChangeDetectionStrategy, ContentChildren, EventEmitter, Output, ViewChild } from '@angular/core';
import { QueryList } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomColumnComponent } from '../custom-column/custom-column.component';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent {
  @Input() data!: any;
  @Input() getItemsFunc: (data: any) => any[] = (data) => data;
  @Input() getItemsCountFunc: (data: any) => number = (data: any) => data.length;
  @Input() serverSidePaging: boolean = false;
  @Input() serverSideSorting?: boolean = false;

  @ContentChildren(CustomColumnComponent) columns!: QueryList<CustomColumnComponent>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  dataSource!: MatTableDataSource<any>;

  @Output() tableChanged: EventEmitter<any> = new EventEmitter<any>();

  public get displayedColumns() {
    return this.columns.map((x) => x.fieldName);
  }

  public get totalCount() {
    return this.getItemsCountFunc(this.data);
  }

  public get items() {
    return this.getItemsFunc(this.data);
  }

  constructor() { }

  ngAfterViewInit() {

    this.dataSource = new MatTableDataSource<any>(this.items);

    if(!this.serverSideSorting)
      this.dataSource.sort = this.sort;

    if(!this.serverSidePaging)
      this.dataSource.paginator = this.paginator;
  }

  protected refreshData(data: any): void {
    const items = this.getItemsFunc(data);
    const totalCount  = this.getItemsCountFunc(data);

    if(totalCount != this.totalCount)
        this.paginator.firstPage();

    this.dataSource.data = items;
    this.table.renderRows();
  }

  handleTableChanged(): void {
    const event = {
      paging: {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      },
      sorting: {
        sortColumn: this.sort.active,
        sortDirection: this.sort.direction
      }
    };

    this.tableChanged.emit(event);
  }



}
