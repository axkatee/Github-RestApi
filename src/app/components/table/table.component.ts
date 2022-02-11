import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { InfoDialogComponent } from "../info-dialog/info-dialog.component";
import { IAuthor, IIssues } from "../../interfaces/interfaces";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public filterValue: string;
  public issuesData: IIssues[] = [];
  public displayedColumns: string[] = ['id', 'title', 'author', 'created_at', 'url'];
  public dataSource: MatTableDataSource<IIssues>;

  private subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.apiService.getGithubApi().subscribe(issues => this.getIssues(issues))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription?.unsubscribe());
  }

  getIssues(issues: IIssues[]): void {
    this.issuesData = issues;
    this.dataSource = new MatTableDataSource<IIssues>(this.issuesData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(issueId: string): void {
    const selectedIssue = this.issuesData.find(issue => issue.id === issueId);
    const { created_at, number, repository_url, state, title, html_url, user } = selectedIssue;
    const author: IAuthor = user;

    this.dialog.open(InfoDialogComponent, {
      width: '500px',
      data: {
        title: `Info about issue with id: ${issueId}`,
        issueTitle: title,
        userLogin: author.login,
        userUrl: author.html_url,
        repository_url,
        html_url,
        number,
        state,
        created_at
      }
    });
  }
}
