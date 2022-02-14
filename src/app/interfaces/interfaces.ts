export interface IIssues {
  url: string;
  id: string;
  active_lock_reason?: null;
  assignee?: null;
  assignees?: any[];
  author_association?: string;
  body?: string;
  closed_at?: null;
  comments?: number;
  comments_url?: string;
  created_at?: Date;
  draft?: boolean;
  events_url?: string;
  html_url?: string;
  labels?: any[];
  labels_url?: string;
  locked?: boolean;
  milestone?: null;
  node_id?: string;
  number?: number;
  performed_via_github_app?: null;
  pull_request?: object;
  reactions?: object;
  repository_url?: string;
  state?: string;
  timeline_url?: string;
  title?: string;
  updated_at?: Date;
  user?: object;
}

export interface ITotalCountOfIssuesResponse {
  incomplete_results: boolean;
  items: IIssues[];
  total_count: number
}

export interface IAuthor {
  login?: string,
  html_url?: string,
  avatar_url?: string,
  events_url?: string,
  followers_url?: string,
  following_url?: string,
  gists_url?: string,
  gravatar_id?: string,
  id?: number,
  node_id?: string,
  organizations_url?: string,
  received_events_url?: string,
  repos_url?: string,
  site_admin?: boolean,
  starred_url?: string,
  subscriptions_url?: string,
  type?: string,
  url?: string
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
