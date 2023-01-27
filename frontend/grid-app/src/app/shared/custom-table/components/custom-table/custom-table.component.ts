import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ContentChild,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Component, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { WebApiService } from '@core/web-api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, finalize, Observable } from 'rxjs';
import { ColumnDefinitionsDirective } from '../../directives/app-column-definitions.directive';
import { TableChangedEvent } from './models';

@UntilDestroy()
@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent implements AfterViewInit {
  @Input() data!: any;
  @Input() getItemsFunc: (data: any) => any[] = (data) => data;
  @Input() getDataFunc!: (
    event: TableChangedEvent,
    additionalData?: any
  ) => Observable<any>;
  @Input() getItemsCountFunc: (data: any) => number = (data: any) =>
    data.length;
  @Input() serverSide: boolean = false;
  @Input() additionalData?: any;
  @Input() pageSizes: number[] = [5, 10, 20];

  @ContentChild(ColumnDefinitionsDirective) columnsContainer!: ColumnDefinitionsDirective;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  dataSource!: MatTableDataSource<any>;

  @Output() tableChanged: EventEmitter<any> = new EventEmitter<any>();

  public get columns() {
    return this.columnsContainer.columns;
  }

  public get displayedColumns() {
    return this.columns.map((x) => x.fieldName);
  }

  public get totalCount() {
    return this.getItemsCountFunc(this.data);
  }

  public get items() {
    return this.getItemsFunc(this.data);
  }

  public get currentTableEvent() {
    return {
      paging: {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
      },
      sorting: {
        sortColumn: this.sort.active,
        sortDirection: this.sort.direction,
      },
    };
  }

  constructor(private _api: WebApiService) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.items);

    if (!this.serverSide) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    const event: TableChangedEvent = this.currentTableEvent;

    this.getDataFunc(event, this.additionalData).pipe(
      untilDestroyed(this)
    ).subscribe((data) => {
      this.data = this.getItemsFunc(data);
      this.dataSource.data = this.data;
      this.paginator.length = this.getItemsCountFunc(data);
    });
  }

  handleTableChanged(): void {
    const event: TableChangedEvent = this.currentTableEvent;

    if (this.serverSide) {
      this.getDataFunc(event, this.additionalData).pipe(
        untilDestroyed(this)
      ).subscribe((data: any) => {
        this.data = data;
      });
    }

    this.tableChanged.emit(event);
  }

  protected refreshData(additionalData: any): void {
    const event: TableChangedEvent = this.currentTableEvent;

    this.getDataFunc(event, additionalData).pipe(
      untilDestroyed(this)
    ).subscribe((data) => {
      const items = this.getItemsFunc(data);
      const totalCount = this.getItemsCountFunc(data);

      this.data = items;
      this.dataSource.data = items;
      this.paginator.length = totalCount;

      if (totalCount != this.totalCount) this.paginator.firstPage();
    });
  }

}
