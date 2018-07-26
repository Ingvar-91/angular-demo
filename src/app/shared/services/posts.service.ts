import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';

@Injectable()
export class PostsService extends Api {

  actionName = 'posts';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getData(sort: string = 'id', order: string = 'desc', page: number, pageSize: number = 10, filterField: string | null, filterValue: string | null) {
    return this.get(`${this.actionName}?limit=${pageSize}&sort=${sort}&order=${order}&offset=${(page * pageSize)}&searchValue=${filterValue}&searchField=${filterField}`);
  }

  add(data: any) {
    return this.post(this.actionName, data);
  }

  getCountPostsByRangeDate(startDate: string, endDate: string) {
    return this.get(`stats/getCountPostsByRangeDate?startDate=${startDate}&endDate=${endDate}`);
  }

  edit(data: any, id: number | string) {
    return this.put(`${this.actionName}/${id}`, data);
  }

  delete(ids: number[]) {
    return this.remove(`${this.actionName}/${ids.join(',')}`);
  }

  getById(id) {
    return this.get(`${this.actionName}/${id}`);
  }
}
