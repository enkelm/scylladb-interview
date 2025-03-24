export type IPagedBooks = {
  totalCount: number;
  items: IBook[];
};

export type IBook = {
  id: string;
  isbn: string;
  image: string;
  title: string;
  author: string;
  description: string;
  pageCount: number;
  price: number;
};
