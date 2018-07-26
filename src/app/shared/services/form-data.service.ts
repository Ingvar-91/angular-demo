import {Injectable} from '@angular/core';

@Injectable()
export class FormDataService {

  getFormData(formValue: object, files: object[] = [], titleFiles: string = 'files', titleFile: string = 'file'): FormData {
    const formData = new FormData();
    Object.keys(formValue).forEach(function(title) {
      formData.append(title.toString(), formValue[title] ? formValue[title] : '');
    }.bind(formValue));

    Object.keys(files).forEach(function(title, i) {
      formData.append(`files[${i}]`, <File>files[i]);
    }.bind(files));
    return formData;
  }

}
