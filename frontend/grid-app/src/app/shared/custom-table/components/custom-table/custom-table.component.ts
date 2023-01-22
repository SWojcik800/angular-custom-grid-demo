import { AfterViewInit, ChangeDetectionStrategy, ContentChildren, EventEmitter, Output, ViewChild } from '@angular/core';
import { QueryList } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { WebApiService } from '@core/web-api';
import { Observable } from 'rxjs';
import { CustomColumnComponent } from '../custom-column/custom-column.component';
import { TableChangedEvent } from './models';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent implements AfterViewInit {
  @Input() data!: any;
  @Input() getItemsFunc: (data: any) => any[] = (data) => data;
  @Input() getDataFunc!: (event: TableChangedEvent, additionalData?: any) => Observable<any>;
  @Input() getItemsCountFunc: (data: any) => number = (data: any) => data.length;
  @Input() serverSide: boolean = false;
  @Input() additionalData?: any;

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

  constructor(private _api: WebApiService) { }

  ngAfterViewInit() {

    this.dataSource = new MatTableDataSource<any>(this.items);

    if(!this.serverSide)
    {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.data = this.getItemsFunc(this.data);
      this.dataSource.data = this.data;
      this.paginator.length = this.getItemsCountFunc(this.data);
    } else {
      const event: TableChangedEvent = this.getCurrentTableEvent();

      this.getDataFunc(event, this.additionalData).subscribe((data) => {
        this.data = this.getItemsFunc(data);
        this.dataSource.data = this.data;
        this.paginator.length = this.getItemsCountFunc(data);
      });

    }
  }

  handleTableChanged(): void {
    const event: TableChangedEvent = {
      paging: {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      },
      sorting: {
        sortColumn: this.sort.active,
        sortDirection: this.sort.direction
      }
    };

    if(this.serverSide) {
      this.getDataFunc(event, this.additionalData).subscribe((data: any) => {
        this.data = data;
      });
    }

    this.tableChanged.emit(event);
  }

  getCurrentTableEvent(): TableChangedEvent {
    return ({
      paging: {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      },
      sorting: {
        sortColumn: this.sort.active,
        sortDirection: this.sort.direction
      }
    });
  }

  protected refreshData(additionalData: any): void {
    const event: TableChangedEvent = this.getCurrentTableEvent();

    this.getDataFunc(event, additionalData).subscribe((data) => {

      const items = this.getItemsFunc(data);
      const totalCount  = this.getItemsCountFunc(data);

      this.data = items
      this.dataSource.data = items
      this.paginator.length = totalCount;

    if(totalCount != this.totalCount)
        this.paginator.firstPage();
    });
  }

}
