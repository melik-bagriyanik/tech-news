export interface ArticleAuthor {
  name: string;
  username: string;
  profileImage: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  coverImage: string | null;
  publishedAt: string;
  readingTimeMinutes: number;
  tags: string[];
  url: string;
  author: ArticleAuthor;
}

export interface ArticleDetail extends Article {
  bodyHtml: string;
}

export interface GetArticlesParams {
  page?: number;
  perPage?: number;
  tag?: string;
}
