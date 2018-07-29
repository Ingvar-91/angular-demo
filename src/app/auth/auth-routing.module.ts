import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import {AuthGuard} from '../shared/core/auth.guard';

const routes: Routes = [
    {path: '', component: AuthComponent, canActivate: [AuthGuard], children: [
        {path: '', component: LoginComponent},
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent}
    ]}
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {}
