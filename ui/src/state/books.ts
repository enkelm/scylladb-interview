import type { IBook } from "@/api/types";
import { atom } from "jotai";

type IBookAtom = {
  loading: boolean;
  response: IBook[];
};

export const booksAtom = atom<IBookAtom>({
  loading: false,
  response: [],
});
