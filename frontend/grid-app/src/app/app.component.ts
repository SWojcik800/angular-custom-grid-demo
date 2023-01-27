import { Component } from '@angular/core';
import { WebApiService } from '@core/web-api';
import { Observable, tap } from 'rxjs';
import { TableChangedEvent } from './shared/custom-table/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _api: WebApiService) {
  }

  getData = (event: TableChangedEvent): Observable<any>  =>
    this._api.get('/posts');

    actionTriggered = (x: any) => console.log(x);
}
