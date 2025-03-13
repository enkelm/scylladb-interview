import { IBook } from "./types";

const getBooks = async (q: string): Promise<IBook[]> => {
  const response = await fetch(`http://localhost:6000/api?q=${q}`);
  const data = await response.json();
  console.debug(data[0].title);
  return data;
};

export default getBooks;
