import { Component, OnInit } from '@angular/core';
import { WebApiService } from '@core/web-api';
import { Observable } from 'rxjs';
import { TableChangedEvent } from 'src/app/shared/custom-table/components';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss']
})
export class CompaniesTableComponent {

  constructor(private _api: WebApiService) { }

  getData = (event: TableChangedEvent): Observable<any>  =>
  this._api.get('/companies', {
    _page: event.paging.pageIndex,
    _limit: event.paging.pageSize,
    _order: event.sorting.sortDirection,
    _sort: event.sorting.sortColumn
  });

  getItems = (res: any) => res.body;

  getTotalCount = (res: any) => res.headers.get('X-Total-Count');


}
