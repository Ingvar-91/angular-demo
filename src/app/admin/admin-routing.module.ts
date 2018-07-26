import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './admin.component';
import {UsersComponent} from './pages/users/users.component';
import {StatsComponent} from './pages/stats/stats.component';
import {AddEditUsersComponent} from './pages/users/add-edit-users/add-edit-users.component';
import {PostsComponent} from './pages/posts/posts.component';
import {AddEditPostsComponent} from './pages/posts/add-edit-posts/add-edit-posts.component';
import {AuthGuard} from '../shared/core/auth.guard';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    {path: 'posts', children: [
      {path: '', component: PostsComponent},
      {path: 'add', component: AddEditPostsComponent},
      {path: 'edit/:id', component: AddEditPostsComponent}
    ]},
    {path: 'users', children: [
      {path: '', component: UsersComponent},
      {path: 'add', component: AddEditUsersComponent},
      {path: 'edit/:id', component: AddEditUsersComponent}
    ]},
    {path: 'stats', component: StatsComponent},
  ]}
];

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
