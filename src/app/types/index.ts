export interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  company: Company;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentWithUser extends Comment {
  user?: User;
}