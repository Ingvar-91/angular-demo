import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinct, startWith, switchMap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {Title} from '@angular/platform-browser';
import * as moment from 'moment';
import 'moment/locale/ru';
import {BaseComponent} from '../../../shared/components/base.component';
import {PostsService} from '../../../shared/services/posts.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent extends BaseComponent implements OnInit {

  stats: object[];
  spinner = true;
  /**/
  form = new FormGroup({
    'startDate': new FormControl(new Date(2018, 6, 14)),
    'endDate': new FormControl(new Date(2018, 6, 21))
  });

  constructor(
    private postsService: PostsService,
    private title: Title,
  ) {
    super();
  }

  ngOnInit() {
    this.title.setTitle('Статистика');
    /**/
    this.subs$[this.subs$.length] = merge(
      this.form.get('startDate').valueChanges,
      this.form.get('endDate').valueChanges
    )
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.postsService.getCountPostsByRangeDate(
          moment(this.form.get('startDate').value).format('YYYY-MM-DD'),
          moment(this.form.get('endDate').value).format('YYYY-MM-DD')
        );
      })
    )
    .subscribe((data) => {
      const stats = [];
      if (data.length) {
        Object.keys(data).forEach(function(key) {
          stats.push({'name': moment(data[key].created_at_format).format('DD MMM YYYY'), 'value': data[key].count});
        }.bind(data));
      }
      this.stats = stats;
      this.spinner = false;
    });
  }

}
