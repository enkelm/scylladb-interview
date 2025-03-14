import { IBook } from "./types";

const getBooks = async (q: string): Promise<IBook[]> => {
  const response = await fetch(`http://localhost:6000/api?q=${q}`);
  return await response.json();
};

export default getBooks;
