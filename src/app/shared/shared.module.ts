import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormDataService} from './services/form-data.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FormDataService
  ],
  bootstrap: [
  ]
})
export class SharedModule { }
