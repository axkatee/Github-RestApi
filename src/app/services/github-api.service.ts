import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private notificationConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'top'
  }

  constructor(
    private http: HttpClient,
    private notification: MatSnackBar
  ) { }

  getIssues(page: number, itemsPerPage: number): Observable<any> {
    const api: string = `${environment.githubIssuesUrl}=${page}&per_page=${itemsPerPage}`;
    return this.http.get(api).pipe(
      catchError(err => {
        this.notification.open('Request limit exceeded', 'ok', this.notificationConfig);
        return throwError(err);
      }));
  }

  getNumberOfIssues(): Observable<any> {
    return this.http.get(environment.githubApiUrl).pipe(
      catchError(err => {
        this.notification.open('Request limit exceeded', 'ok', this.notificationConfig);
        return throwError(err);
      }));
  }
}
