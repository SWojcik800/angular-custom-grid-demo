import { Component, OnInit } from '@angular/core';
import { WebApiService } from '@core/web-api';
import { Observable } from 'rxjs';
import { TableChangedEvent } from 'src/app/shared/custom-table/components';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss']
})
export class PostsTableComponent {

  constructor(private _api: WebApiService) {
  }

  getData = (event: TableChangedEvent): Observable<any>  =>
    this._api.get('/posts');
    actionTriggered = (x: any) => console.log(x);

}
