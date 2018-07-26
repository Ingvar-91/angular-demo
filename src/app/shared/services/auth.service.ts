import {User} from '../models/user.model';

export class AuthService {

  login(user: object) {
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout() {
    window.localStorage.clear();
  }

  check(): boolean {
    if (JSON.parse(window.localStorage.getItem('user'))) {
      return true;
    } else {
      return false;
    }
  }

  auth(): User {
    return JSON.parse(window.localStorage.getItem('user'));
  }
}
