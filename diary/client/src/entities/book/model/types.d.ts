export interface Book {
    id: string;
    title: string;
    authors: string[];
    pageCount: number;
    coverUrl: string;
    description: string;
    status: 'wantToRead' | 'reading' | 'planned';
    comments?: string;
  }
  