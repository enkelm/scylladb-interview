import { cartAtom } from "@/state/shopping-cart";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import CartItemCard from "./card";

const CartList = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setCart({ open: false, items: [], total: { quantity: 0, price: 0 } });
    },
    [setCart],
  );

  if (!cart.open) return null;

  return (
    <form
      className="min-w-md max-h-[800px] px-4 flex flex-col gap-2 overflow-scroll"
      onSubmit={submitHandler}
    >
      {cart.items.map((item, index) => (
        <CartItemCard key={"cart-item-" + item.id} item={{ ...item, index }} />
      ))}
      <p>Total Quantity: {cart.total.quantity}</p>
      <p>Total Price: ${cart.total.price.toFixed(2)}</p>
      <Button type="submit">Checkout</Button>
    </form>
  );
};

export default CartList;
