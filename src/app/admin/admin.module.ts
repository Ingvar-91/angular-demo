import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BreadcrumbsModule } from 'ng6-breadcrumbs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { StatsComponent } from './pages/stats/stats.component';
import { UsersComponent } from './pages/users/users.component';
import { ConfirmComponent } from './shared/components/dialog/confirm/confirm.component';
import { AlertComponent } from './shared/components/dialog/alert/alert.component';
import { PromptComponent } from './shared/components/dialog/prompt/prompt.component';
import { NgxUploaderModule } from 'ngx-uploader';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
  DateAdapter
} from '@angular/material';
import {UploadComponent} from '../shared/components/upload/upload.component';
import {ToastrModule} from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {CustomDateAdapter} from './shared/adapter/custom-date-adapter';
import {MomentModule} from 'ngx-moment';
import { AddEditUsersComponent } from './pages/users/add-edit-users/add-edit-users.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { PostsComponent } from './pages/posts/posts.component';
import { AddEditPostsComponent } from './pages/posts/add-edit-posts/add-edit-posts.component';
import {PostsService} from '../shared/services/posts.service';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    StatsComponent,
    UsersComponent,
    ConfirmComponent,
    AlertComponent,
    PromptComponent,
    UploadComponent,
    AddEditUsersComponent,
    PostsComponent,
    AddEditPostsComponent
  ],
  entryComponents: [
    ConfirmComponent,
    AlertComponent,
    PromptComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    BreadcrumbsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ToastrModule.forRoot(),
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    NgxUploaderModule,
    NgxChartsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MomentModule,
    ImageCropperModule
  ],
  providers: [
    PostsService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: []
})
export class AdminModule {}
