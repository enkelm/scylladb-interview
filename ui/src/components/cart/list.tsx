import { cartAtom, cartTotalAtom } from "@/state/shopping-cart";
import { useAtom, useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import CartItemCard from "./card";

const CartList = () => {
  const cartTotal = useAtomValue(cartTotalAtom);
  const [cart, setCart] = useAtom(cartAtom);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setCart({ open: false, items: [] });
    },
    [setCart],
  );

  if (!cart.open) return null;

  return (
    <form
      className="min-w-md max-h-[800px] px-4 flex flex-col gap-2 overflow-scroll"
      onSubmit={submitHandler}
    >
      {cart.items.map((item, index) => {
        return (
          <CartItemCard
            key={"cart-item-" + item.id}
            item={{
              ...item,
              index,
            }}
          />
        );
      })}
      <p>Total Quantity: {cartTotal.quantity}</p>
      <p>Total Price: ${cartTotal.price.toFixed(2)}</p>
      <Button type="submit">Checkout</Button>
    </form>
  );
};

export default CartList;
