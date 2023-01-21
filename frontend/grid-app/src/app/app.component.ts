import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WebApiService } from '@core/web-api';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grid-app';
  data$: Observable<any> = this._api.get('/posts');

  constructor(private _api: WebApiService) {


  }
}
