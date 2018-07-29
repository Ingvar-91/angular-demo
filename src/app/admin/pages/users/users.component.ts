import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, FormGroup} from '@angular/forms';
import {BaseComponent} from '../../../shared/components/base.component';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../../../shared/services/users.service';
import {debounceTime, startWith, switchMap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {ConfirmComponent} from '../../shared/components/dialog/confirm/confirm.component';
import {User} from '../../../shared/models/user.model';
import {ToastrService} from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {
  users: User[] = [];

  /* TABLE */
  displayedColumns: string[] = [
    'select',
    'image',
    'email',
    'name',
    'action'
  ];
  selectionTable = new SelectionModel(true, []);
  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /* TABLE END */

  /* FILTER */
  filterList = [
    {title: 'E-mail', value: 'email'},
    {title: 'Имя', value: 'name'},
    {title: 'Фамилия', value: 'surname'},
    {title: 'Отчество', value: 'patronymic'}
  ];
  form = new FormGroup({
    'filterValue': new FormControl(''),
    'filterField': new FormControl(this.filterList[0].value)
  });
  /* FILTER END */

  /* delete table change */
  deleteChange = new EventEmitter<boolean>();
  /* delete table change END */

  constructor(
    private usersService: UsersService,
    private title: Title,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.title.setTitle('Пользователи');

    this.subs$[this.subs$.length] = merge(
      this.sort.sortChange,
      this.form.get('filterValue').valueChanges.pipe(debounceTime(600)),
      this.deleteChange
    ).subscribe(() => this.paginator.pageIndex = 0);

    this.subs$[this.subs$.length] = merge(
      this.sort.sortChange,
      this.paginator.page,
      this.form.get('filterValue').valueChanges.pipe(debounceTime(600)),
      this.deleteChange
    )
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.usersService.getData(
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.form.get('filterField').value,
          this.form.get('filterValue').value
        );
      })
    )
    .subscribe((data) => {
      this.isLoadingResults = false;
      this.resultsLength = data.total;
      Array.from(data.items).forEach((item) => {
        if (item['image']) {
          item['image'] = environment.domain + environment.filesUrl.users + item['image'];
        } else {
          item['image'] = environment.domain + environment.imgNotFound;
        }
      });
      this.users = data.items;
    });
  }

  /* DELETE */
  onDelete(id: number = 0) {
    const ids = [];
    if (!id && this.selectionTable.selected.length) {
      ids.push(
        this.selectionTable.selected.map(function (el) {
          return el.id;
        })
      );
    } else {
      ids.push(id);
    }
    this.subs$[this.subs$.length] = this.usersService.delete(ids).subscribe((data) => {
        this.deleteChange.emit(true);
        if (this.selectionTable.selected.length) {
          this.selectionTable.clear();
        }
        this.toastr.success('Данные успешно удалены', 'Готово');
      });
  }

  confirmDelete(id: number = 0) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {message: 'Вы действительно хотите удалить эти данные?'}
    });
    this.subs$[this.subs$.length] = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(id);
      }
    });
  }
  /* DELETE END*/

  /* SELECTED */
  isAllSelected() {
    const numSelected = this.selectionTable.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selectionTable.clear() :
      this.users.forEach(row => this.selectionTable.select(row));
  }
  /* SELECTED END */

}
