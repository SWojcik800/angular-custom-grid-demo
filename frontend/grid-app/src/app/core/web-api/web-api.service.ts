import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private _httpClient: HttpClient) { }

  public get = (url: string, params?: any): Observable<any> => this._httpClient.get(environment.wepApiUrl+url, params);
  public post = (url: string, params?: any): Observable<any> => this._httpClient.post(environment.wepApiUrl+url, params);
  public put = (url: string, params: any): Observable<any> => this._httpClient.put(environment.wepApiUrl+url, params);
  public patch = (url: string, params: any): Observable<any> => this._httpClient.patch(environment.wepApiUrl+url, params);
  public delete = (url: string, params: any): Observable<any> => this._httpClient.delete(environment.wepApiUrl+url, params);
}
