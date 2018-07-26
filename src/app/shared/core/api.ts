import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Response} from '@angular/http';
import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Api {
  constructor(
    protected httpClient: HttpClient
  ) {}

  private getUrl(url: string = ''): string {
    return environment.apiUrl + url;
  }

  protected get(url: string = ''): Observable<any> {
    return this.httpClient.get(this.getUrl(url)).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  protected post(url: string = '', data: any = {}): Observable<any> {
    return this.httpClient.post(this.getUrl(url), data).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  protected put(url: string = '', data: any = {}): Observable<any> {
    let http = this.httpClient.put(this.getUrl(url), data);
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      http = this.httpClient.post(this.getUrl(url), data);
    }
    return http.pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  protected remove(url: string = ''): Observable<any> {
    return this.httpClient.delete(this.getUrl(url)).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
