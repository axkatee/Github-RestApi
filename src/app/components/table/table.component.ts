import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { GithubApiService } from "../../services/github-api.service";
import { InfoDialogComponent } from "../info-dialog/info-dialog.component";
import { IAuthor, IIssues, ITotalCountOfIssuesResponse } from "../../interfaces/interfaces";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  public totalCountOfIssues: number = 0;
  public issuesData: IIssues[] = [];
  public displayedColumns: string[] = ['id', 'title', 'author', 'created_at', 'url'];
  public dataSource: MatTableDataSource<IIssues>;

  constructor(
    private apiService: GithubApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getIssues(1, 10);
    this.getNumberOfIssues();
  }

  getIssues(page: number, itemsPerPage: number): void {
    this.apiService.getIssues(page, itemsPerPage).subscribe((issues: IIssues[]) => {
      this.setIssues(issues);
    });
  }

  getNumberOfIssues(): void {
    this.apiService.getNumberOfIssues().subscribe((res: ITotalCountOfIssuesResponse) => {
      this.totalCountOfIssues = res.total_count;
    });
  }

  setIssues(issues: IIssues[]): void {
    this.issuesData = issues;
    this.dataSource = new MatTableDataSource<IIssues>(this.issuesData);
    this.dataSource.sort = this.sort;
  }

  openDialog(issueId: string): void {
    const selectedIssue: IIssues = this.issuesData.find(issue => issue.id === issueId);
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
