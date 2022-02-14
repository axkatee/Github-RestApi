export interface IIssue {
  id: string;
  created_at: Date;
  html_url: string;
  repository_url: string;
  state: string;
  title: string;
  user: IAuthor;
  number: number;
}

export interface ITotalCountOfIssuesResponse {
  total_count: number;
}

export interface IAuthor {
  login: string;
  html_url: string;
}

export interface IShowInfoDialogData {
  title: string;
  issueTitle: string;
  userLogin: string;
  userUrl: string;
  repository_url: string;
  html_url: string;
  number: number;
  state: boolean;
  created_at: Date;
}
