import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';

@Injectable()
export class UsersService extends Api {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getData(sort: string = 'id', order: string = 'desc', page: number, pageSize: number = 10, filterField: string | null, filterValue: string | null) {
    return this.get(`user?limit=${pageSize}&sort=${sort}&order=${order}&offset=${(page * pageSize)}&searchValue=${filterValue}&searchField=${filterField}`);
  }

  authUser(email: string, password: string) {
    return this.post('login', {
      email: email.toLowerCase(),
      password: password
    });
  }

  regUser(email: string, password: string) {
    return this.post('register', {
      email: email.toLowerCase(),
      password: password
    });
  }

  getUserByEmail(email: string) {
    return this.get(`getUserByEmail?email=${email.toLowerCase()}`);
  }

  getById(id: number | string) {
    return this.get(`user/${id}`);
  }

  add(data: object) {
    return this.post('user', data);
  }

  edit(data: object, id: number | string) {
    return this.put(`user/${id}`, data);
  }

  delete(ids: number[]) {
    return this.remove(`user/${ids.join(',')}`);
  }
}
