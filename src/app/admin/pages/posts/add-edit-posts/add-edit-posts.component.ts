import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {FormDataService} from '../../../../shared/services/form-data.service';
import {BaseComponent} from '../../../../shared/components/base.component';
import {PostsService} from '../../../../shared/services/posts.service';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-add-edit-posts',
  templateUrl: './add-edit-posts.component.html',
  styleUrls: ['./add-edit-posts.component.scss']
})
export class AddEditPostsComponent extends BaseComponent implements OnInit {

  actionName = 'posts';
  form: FormGroup;
  @ViewChild('pageForm') pageForm;
  dataPage: Posts;

  /* UPLOADED FILES */
  @ViewChild('upload') upload;
  /* UPLOADED FILES END */

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private formDataService: FormDataService,
    private route: ActivatedRoute,
    /*private breadcrumbsService: BreadcrumbsService,*/
    private title: Title,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'content': new FormControl(''),
      'excerpt': new FormControl('')
    });

    if (this.route.snapshot.params['id']) {
      this.title.setTitle('Редактировать запись');
      /**/
      this.subs$[this.subs$.length] = this.postsService.getById(this.route.snapshot.params['id'])
        .subscribe((data) => {
          this.dataPage = data;
          this.form.setValue({
            title: this.dataPage.title,
            content: this.dataPage.content,
            excerpt: this.dataPage.excerpt
          });
        });
    } else {
      this.title.setTitle('Добавить запись');
    }

    /*breadcrumbs*/
    /*this.breadcrumbsService.store([
      {label: 'Новости' , url: '/admin/news', params: []},
      {label: this.title.getTitle() , url: '/admin/news/:id', params: []}
    ]);*/
  }

  onSubmit() {
    const formData = this.formDataService.getFormData(
      this.form.value,
      this.upload.getFiles()
    );
    formData.append('user_id', this.authService.auth().id);
    /*если id нет, значит POST*/
    if (!this.route.snapshot.params['id']) {
      this.subs$[this.subs$.length] = this.postsService.add(formData)
        .subscribe((data) => {
          this.pageForm.resetForm();
          this.upload.clear();
          this.toastr.success('Данные успешно добавлены', 'Готово');
        });
    } else { /*если id есть, значит PUT*/
      this.subs$[this.subs$.length] = this.postsService.edit(formData, this.route.snapshot.params['id'])
        .subscribe((data) => {
          console.log(data);
          this.toastr.success('Данные успешно обновлены', 'Готово');
        });
    }

  }

}
