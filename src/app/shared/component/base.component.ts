import { OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  template: '',
  styles: ['']
})
export class BaseComponent implements OnDestroy {
  $onDestroy = new Subject<boolean>();

  ngOnDestroy() {
    this.$onDestroy.next();
  }
}
