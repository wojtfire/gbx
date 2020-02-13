import { BaseComponent } from 'src/app/shared/component/base.component';
import { Component, OnInit, Input } from '@angular/core';
import { RepoDto } from '../main/main.component';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent extends BaseComponent implements OnInit {
  @Input() repos: RepoDto[];

  ngOnInit() {}
}
