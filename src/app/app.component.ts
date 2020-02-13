import { Component } from '@angular/core';
import { AppLoadingService } from './app-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loadingService: AppLoadingService) {}
}
