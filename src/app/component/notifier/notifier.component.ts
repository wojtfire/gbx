import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { NotifierService } from './notifier.service';
import { takeUntil } from 'rxjs/operators';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-notifier',
  template: `
    <div class="notifier" [class.visible]="visible"><span>{{ message }}</span></div>
  `,
  styles: [`
    .notifier {
      display: flex;
      width: 150px;
      position: fixed;
      bottom: -60px;
      left: 50%;
      right: 50%;
      padding: 20px;
      transition: 0.5s;
      background-color: #f22727;
      color: white;
      justify-content: center;
      -webkit-box-shadow: 0px 4px 10px 3px rgba(0,0,0,0.17);
      -moz-box-shadow: 0px 4px 10px 3px rgba(0,0,0,0.17);
      box-shadow: 0px 4px 10px 3px rgba(0,0,0,0.17);
      border-radius: 8px;
    }

    .notifier.visible {
      transform: translateY(-80px);
      transition: 0.5s;
    }

    .notifier span {
      align-self: center;
    }
  `]
})
export class NotifierComponent extends BaseComponent implements OnInit {
    visible: boolean;
    message: string;

    constructor(private service: NotifierService) {
      super();
    }

    ngOnInit() {
      this.onOpen();
      this.onClose();
    }

    private onOpen() {
      this.service.openEvent.pipe(takeUntil(this.$onDestroy)).subscribe(open => {
        console.log('open');
        this.visible = true;
        this.message = this.service.message;
      });
    }

    private onClose() {
      this.service.closeEvent.pipe(takeUntil(this.$onDestroy)).subscribe(close => {
        this.visible = false;
      });
    }
}
