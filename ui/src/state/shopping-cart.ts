import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { booksAtom } from "./books";

export type ShoppingCartItem = {
  id: string;
  quantity: number;
};

export type ShoppingCart = {
  open: boolean;
  items: ShoppingCartItem[];
};

export const cartAtom = atomWithStorage("shoppingCart", {
  open: false,
  items: [],
  total: { price: 0, quantity: 0 },
} as ShoppingCart);

export const isCartOpenAtom = atom((get) => get(cartAtom).open);
export const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom);
  const { response: books } = get(booksAtom);

  return cart.items.reduce(
    (acc, item) => {
      const book = books.find((b) => b.id === item.id);
      if (!book) return acc;
      return {
        price: acc.price + book.price * item.quantity,
        quantity: acc.quantity + item.quantity,
      };
    },
    { price: 0, quantity: 0 },
  );
});
