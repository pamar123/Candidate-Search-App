// types.ts
export interface GitHubUser {
    login: string;
    name: string | null;
    location: string | null;
    avatar_url: string;
    email: string | null;
    html_url: string;
    company: string | null;
    id: number;
  }