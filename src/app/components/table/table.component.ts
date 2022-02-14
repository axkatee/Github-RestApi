import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { GithubApiService } from "../../services/github-api.service";
import { InfoDialogComponent } from "../info-dialog/info-dialog.component";
import { IAuthor, IIssue, ITotalCountOfIssuesResponse } from "../../interfaces/interfaces";

const initPage: number = 1;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  public totalCountOfIssues: number = 0;
  public issuesData: IIssue[] = [];
  public displayedColumns: string[] = ['id', 'title', 'author', 'created_at', 'url'];
  public pageSizeOptions: number[] = [10, 50, 100];
  public dataSource: MatTableDataSource<IIssue>;

  constructor(
    private apiService: GithubApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getNumberOfIssues();
    this.getIssues(initPage, this.pageSizeOptions[0]);
  }

  getIssues(page: number, itemsPerPage: number): void {
    this.apiService.getIssues(page, itemsPerPage).subscribe((issues: IIssue[]) => {
      this.setIssues(issues);
    });
  }

  getNumberOfIssues(): void {
    this.apiService.getNumberOfIssues().subscribe((res: ITotalCountOfIssuesResponse) => {
      this.totalCountOfIssues = res.total_count;
    });
  }

  setIssues(issues: IIssue[]): void {
    this.issuesData = issues;
    this.dataSource = new MatTableDataSource<IIssue>(this.issuesData);
    this.dataSource.sort = this.sort;
  }

  openDialog(selectedIssue: IIssue): void {
    const { id, created_at, number, repository_url, state, title, html_url, user } = selectedIssue;
    const author: IAuthor = user;

    this.dialog.open(InfoDialogComponent, {
      data: {
        title: `Info about issue with id: ${id}`,
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
