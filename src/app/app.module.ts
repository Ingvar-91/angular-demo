import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import {UsersService} from './shared/services/users.service';
import {AuthService} from './shared/services/auth.service';
import {AdminModule} from './admin/admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from './shared/core/auth.guard';

/*
const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatListModule,
  MatSidenavModule,
  MatGridListModule,
  MatCheckboxModule
]

const components = [
  NavbarTopComponent,
  NavbarBreadcrumbsComponent,
  NavbarDetailsComponent,
  NavbarSearchComponent,
  NavbarBottomComponent,
  HamburgerMenuComponent,
  CarouselComponent
]*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    UsersService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
