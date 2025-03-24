import { IPagedBooks } from "./types";

const getBooks = async (q: string, page: number): Promise<IPagedBooks> => {
  const response = await fetch(`http://localhost:6000/api?q=${q}&page=${page}`);
  return await response.json();
};

export default getBooks;
