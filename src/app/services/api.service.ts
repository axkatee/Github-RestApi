import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = `https://api.github.com/repos/angular/angular/issues?page=1}&per_page=100`;

  constructor(private http: HttpClient) { }

  getGithubApi(): Observable<any> {
    return this.http.get(this.api);
  }
}
