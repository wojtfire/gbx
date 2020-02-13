import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { InputTextComponent } from 'src/app/shared/forms/input-text';
import { AppService } from 'src/app/app.service';
import { NotifierService } from '../notifier/notifier.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { AppLoadingService } from 'src/app/app-loading.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(InputTextComponent, { static: false }) inputText: InputTextComponent;
  @ViewChild('header', { static: false }) header: ElementRef;
  form: FormGroup;
  repos: RepoDto[] = [];
  disabledInput: boolean;
  height: number;

  constructor(private fb: FormBuilder, private service: AppService, private notifierService: NotifierService, public loadingService: AppLoadingService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.calculateReposHeight();
  }

  private calculateReposHeight() {
    this.height = window.innerHeight - this.header.nativeElement.offsetHeight - 60;
  }

  private initForm() {
    this.form = this.fb.group({
        userName: [null, Validators.required]
    });
  }

  onUserSearch(event?) {
    this.form.get('userName').markAsDirty();
    this.form.valid && !this.form.get('userName').disabled && this.getUser();
  }

  private getUser() {
    const userName = this.form.get('userName').value;
    this.disabledInput = true;
    this.form.get('userName').disable();
    this.loadingService.start();
    this.service.getUserRepos(userName).pipe(takeUntil(this.$onDestroy)).subscribe(repos => {
      this.repos.length = 0;
      this.repos = this.sortByLastUpdate(repos as RepoDto[]);
      this.form.get('userName').enable();
      this.loadingService.stop();
    }, err => {
      this.notifierService.open(err.statusText, 2000);
      this.form.get('userName').enable();
      this.loadingService.stop();
    });
  }

  private sortByLastUpdate(arr: RepoDto[]) {
    return arr.sort(this.compareDates);
  }

  private compareDates = (a: RepoDto, b: RepoDto): number => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateA > dateB ? dateA === dateB ? 0 : 1 : -1;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateReposHeight();
  }
}

export interface RepoDto {
  id: number;
  name: string;
  private: boolean;
  owner: UserRepoDto;
  description: string;
  default_branch: string;
  updated_at: string;
  html_url: string;
}

export interface UserRepoDto {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
}
