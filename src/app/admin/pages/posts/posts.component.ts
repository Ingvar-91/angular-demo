import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ConfirmComponent} from '../../shared/components/dialog/confirm/confirm.component';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, startWith, switchMap} from 'rxjs/operators';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {SelectionModel} from '@angular/cdk/collections';
import {BaseComponent} from '../../../shared/components/base.component';
import {PostsService} from '../../../shared/services/posts.service';
import {merge} from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends BaseComponent implements OnInit {
  actionName = 'posts';
  dataPage: Posts[] = [];

  /* TABLE */
  displayedColumns: string[] = ['select', 'title', 'user_email', 'created_at', 'action'];
  selectionTable = new SelectionModel(true, []);
  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /* TABLE END */

  /* FILTER */
  filterList = [
    {title: 'Заголовок', value: 'title'},
    {title: 'E-mail', value: 'user_email'}
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
    private postsService: PostsService,
    /*private breadcrumbsService: BreadcrumbsService,*/
    private title: Title,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.title.setTitle('Записи');

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
          return this.postsService.getData(
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
          this.dataPage = data.items;
        },
        error => {
          this.isLoadingResults = false;
          console.log(error);
        },
        () => {
          console.log('onCompleted');
        });

    /*breadcrumbs*/
    /*this.breadcrumbsService.store([
      {label: 'Новости' , url: '/admin/news', params: []}
    ]);*/
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
    this.subs$[this.subs$.length] = this.postsService.delete(ids).subscribe((data) => {
        this.deleteChange.emit(true);
        if (this.selectionTable.selected.length) {
          this.selectionTable.clear();
        }
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
    const numRows = this.dataPage.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selectionTable.clear() :
      this.dataPage.forEach(row => this.selectionTable.select(row));
  }
  /* SELECTED END */

}
