import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class BaseComponent implements OnDestroy {

  protected subs$: Subscription[] = [];
  constructor() { }

  ngOnDestroy(): void {
    this.subs$.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
