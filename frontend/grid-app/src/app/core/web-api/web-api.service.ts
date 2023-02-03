import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { catchError, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(
    private _httpClient: HttpClient,
    private _dialog: MatDialog
    ) { }

  public get = (url: string, params?: any): Observable<any> => this._httpClient.get(environment.webApiUrl+url, {params})
  .pipe(
    catchError((err) => {
      this._dialog.open(ErrorDialogComponent, { data: err })
      return err;
    })
  );
  public post = (url: string, params?: any): Observable<any> => this._httpClient.post(environment.webApiUrl+url, params)
  .pipe(
    catchError((err) => {
      this._dialog.open(ErrorDialogComponent, { data: err })
      return err;
    })
  );
  public put = (url: string, params: any): Observable<any> => this._httpClient.put(environment.webApiUrl+url, params)
  .pipe(
    catchError((err) => {
      this._dialog.open(ErrorDialogComponent, { data: err })
      return err;
    })
  );
  public patch = (url: string, params: any): Observable<any> => this._httpClient.patch(environment.webApiUrl+url, params)
  .pipe(
    catchError((err) => {
      this._dialog.open(ErrorDialogComponent, { data: err })
      return err;
    })
  );
  public delete = (url: string, params: any): Observable<any> => this._httpClient.delete(environment.webApiUrl+url, params)
  .pipe(
    catchError((err) => {
      this._dialog.open(ErrorDialogComponent, { data: err })
      return err;
    })
  );
}
