import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type ShoppingCartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type ShoppingCart = {
  open: boolean;
  items: ShoppingCartItem[];
  total: {
    price: number;
    quantity: number;
  };
};

export const cartAtom = atomWithStorage("shoppingCart", {
  open: false,
  items: [],
  total: { price: 0, quantity: 0 },
} as ShoppingCart);
export const isCartOpenAtom = atom((get) => get(cartAtom).open);
