import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';
import {UsersService} from '../../shared/services/users.service';
import {BaseComponent} from '../../shared/components/base.component';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login/login.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  form = new FormGroup({
    'name': new FormControl(''),
    'email': new FormControl('', [Validators.required, Validators.email], this.emailExist.bind(this)),
    'password': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'passwordConfirm': new FormControl('', [Validators.required], this.passwordConfirm.bind(this)),
  });
  /**/
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
  ) {
    super();
  }

  ngOnInit() {
    this.title.setTitle('Регистрация');
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.subs$[this.subs$.length] = this.usersService.regUser(formData.email, formData.password)
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
            return {userExist: true};
          } else {
            return null;
          }
        })
      );
  }

  passwordConfirm(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.form.get('password').value === this.form.get('passwordConfirm').value) {
        resolve(null);
      } else {
        resolve({passwordConfirm: true});
      }
    });
  }
}
