import type { IPagedBooks } from "@/api/types";
import { atom } from "jotai";

type IBookAtom = {
  loading: boolean;
  response: IPagedBooks;
};

export const initialBooksResponse = { items: [], totalCount: 0 };
export const booksAtom = atom<IBookAtom>({
  loading: false,
  response: initialBooksResponse,
});
