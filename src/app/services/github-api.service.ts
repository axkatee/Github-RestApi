import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../../environments/environment";
import { notificationConfig } from "../configs/config";

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(
    private http: HttpClient,
    private notification: MatSnackBar
  ) { }

  getIssues(page: number, itemsPerPage: number): Observable<any> {
    const api: string = `${environment.githubIssuesUrl}=${page}&per_page=${itemsPerPage}`;
    return this.http.get(api).pipe(
      catchError(err => {
        this.notification.open(err.message, 'ok', notificationConfig);
        return throwError(err);
      }));
  }

  getNumberOfIssues(): Observable<any> {
    return this.http.get(environment.githubApiUrl).pipe(
      catchError(err => {
        this.notification.open(err.message, 'ok', notificationConfig);
        return throwError(err);
      }));
  }
}
