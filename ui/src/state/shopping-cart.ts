import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type ShoppingCartItem = {
  id: string;
  name: string;
  price: number;
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
  return cart.items.reduce(
    (acc, item) => {
      return {
        price: acc.price + item.price * item.quantity,
        quantity: acc.quantity + item.quantity,
      };
    },
    { price: 0, quantity: 0 },
  );
});
