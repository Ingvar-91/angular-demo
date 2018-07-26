import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {BaseComponent} from '../../shared/components/base.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  /**/
  form = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email], this.emailExist.bind(this)),
    'password': new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  error;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
  ) {
    super();
  }

  ngOnInit() {
    this.title.setTitle('Войти');
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.subs$[this.subs$.length] = this.usersService.authUser(formData.email, formData.password)
      .subscribe((user) => {
        this.authService.login(user);
        this.router.navigate(['/admin/stats']);
      });
  }

  emailExist(control: FormControl): Observable<ValidationErrors>  {
    return this.usersService.getUserByEmail(control.value)
      .pipe(
        debounceTime(600),
        map(data => {
          if (data['email'] === control.value.toLowerCase()) {
            return null;
          } else {
            return {userExist: true};
          }
        })
      );
  }

}
