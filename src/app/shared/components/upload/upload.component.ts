import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  isDragOver = false;
  @Input() maxCountFiles = 8;
  @Input() maxSizeFile = 2;
  private selectedFiles: object[] = [];

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit() {}

  onFilesSelected(event): void {
    const files = Array.from(event.target.files);
    /**/
    if (files.length > this.maxCountFiles) {
      files.length = this.maxCountFiles;
      this.toastr.warning(`Максимальное количество файлов ${this.maxCountFiles}`, 'Внимание');
    }

    if (this.selectedFiles.length < this.maxCountFiles) {
      files.forEach(function(file) {
        if (Math.round((file.size / 1000) / 1000) < Number(this.maxSizeFile)) {
          this.selectedFiles.push(<File>file);
        } else {
          this.toastr.warning(`Размер файла ${file.name} превышает ${this.maxSizeFile} Мб`, 'Внимание');
        }
      }.bind(this));
    } else {
      this.toastr.warning(`Максимальное количество файлов ${this.maxCountFiles}`, 'Внимание');
    }
  }

  getFiles(): object[] {
    return this.selectedFiles;
  }

  onDragStart(): void {
    this.isDragOver = true;
  }

  onDragLeave(): void {
    this.isDragOver = false;
  }

  removeFile(key): void {
    this.selectedFiles.splice(key, 1);
  }

  clear(): void {
    this.selectedFiles = [];
  }

  onDrop(event): void {
    if (event.type === 'addedToQueue') {
      const file = event.file.nativeFile;
      /**/
      if (this.selectedFiles.length < this.maxCountFiles) {
        if (Math.round((file.size / 1000) / 1000) < Number(this.maxSizeFile)) {
          this.selectedFiles.push(<File>file);
        } else {
          this.toastr.warning(`Размер файла ${file.name} превышает ${this.maxSizeFile} Мб`, 'Внимание');
        }
      } else {
        this.toastr.warning(`Максимальное количество файлов ${this.maxCountFiles}`, 'Внимание');
      }
    }
    this.isDragOver = false;
  }

}
