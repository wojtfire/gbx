import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const GITHUB_URL = 'https://api.github.com';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  constructor(private http: HttpClient) { }

  getUserRepos(userName: string): Observable<any> {
    return this.http.get<any>(`${GITHUB_URL}/users/${userName}/repos`);
  }
}
