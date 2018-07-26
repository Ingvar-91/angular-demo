import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormDataService} from '../../../../shared/services/form-data.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../../../../shared/services/users.service';
import {BaseComponent} from '../../../../shared/components/base.component';
import {User} from '../../../../shared/models/user.model';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent extends BaseComponent implements OnInit {

  user: User;
  @ViewChild('userForm') userForm;

  spinner = false;
  file: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild('cropper') cropper;

  form = new FormGroup({
    'id': new FormControl(''),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'name': new FormControl(''),
    'password': new FormControl(''),
    'passwordConfirm': new FormControl(''),
    'surname': new FormControl(''),
    'patronymic': new FormControl(''),
    'phone': new FormControl('', [Validators.pattern('^[0-9]{8,15}$')]),
    'file': new FormControl('')
  });

  constructor(
    private usersService: UsersService,
    private formDataService: FormDataService,
    private route: ActivatedRoute,
    private title: Title,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.title.setTitle('Редактировать пользователя');
      /**/
      this.subs$[this.subs$.length] = this.usersService.getById(this.route.snapshot.params['id'])
        .subscribe((data) => {
          this.user = data;
          this.form.setValue({
            id: this.user.id,
            email: this.user.email,
            name: this.user.name,
            surname: this.user.surname,
            patronymic: this.user.patronymic,
            phone: this.user.phone,
            password: '',
            passwordConfirm: '',
            file: ''
          });
        });
    } else {
      this.title.setTitle('Добавить пользователя');
      this.addPasswordValidRules();
    }
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

  onChangePassword(): void {
    if (this.route.snapshot.params['id']) {
      if (this.form.get('password').value || this.form.get('passwordConfirm').value) {
        this.addPasswordValidRules();
      } else {
        this.removePasswordValidRules();
      }
    }
  }

  addPasswordValidRules(): void {
    this.form.controls['password'].setValidators([Validators.required, Validators.minLength(4)]);
    this.form.controls['password'].updateValueAndValidity();
    this.form.controls['passwordConfirm'].setValidators([Validators.required]);
    this.form.controls['passwordConfirm'].setAsyncValidators(this.passwordConfirm.bind(this));
    this.form.controls['passwordConfirm'].updateValueAndValidity();
  }

  removePasswordValidRules(): void {
    this.form.controls['password'].setValidators([]);
    this.form.controls['password'].updateValueAndValidity();
    this.form.controls['passwordConfirm'].setValidators([]);
    this.form.controls['passwordConfirm'].updateValueAndValidity();
  }

  fileChangeEvent(event: any): void {
    if (event.target.files.length) {
      this.file = event.target.files[0];
      this.spinner = true;
      this.imageChangedEvent = event;
    }
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    this.spinner = false;
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  removeCropImage () {
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }

  onSubmit() {
    const formData = this.formDataService.getFormData(
      this.form.value
    );
    formData.append('file', this.file);
    /**/
    const cropData = {
      x1: this.cropper.x1,
      x2: this.cropper.x2,
      y1: this.cropper.y1,
      y2: this.cropper.y2,
      maxWidth: this.cropper.maxSize.width,
      maxHeight: this.cropper.maxSize.height,
      originalWidth: this.cropper.originalSize.height,
      originalHeight: this.cropper.originalSize.width
    };
    formData.append('cropData', JSON.stringify(cropData));

    if (!this.route.snapshot.params['id']) {/*если id нет, значит POST*/
      this.subs$[this.subs$.length] = this.usersService.add(formData)
        .subscribe((data) => {},
          error => {},
          () => {
            this.userForm.resetForm();
            this.imageChangedEvent = '';
            this.croppedImage = '';
            this.toastr.success('Данные успешно добавлены', 'Готово');
          });
    } else { /*если id есть, значит PUT*/
      this.subs$[this.subs$.length] = this.usersService.edit(formData, this.route.snapshot.params['id'])
        .subscribe((data) => {
          console.log(data);
          this.toastr.success('Данные успешно обновлены', 'Готово');
        });
    }
  }

}
