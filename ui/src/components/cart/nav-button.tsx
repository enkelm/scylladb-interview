import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { cartAtom, cartTotalAtom } from "@/state/shopping-cart";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartNavButton = () => {
  const setCart = useSetAtom(cartAtom);
  const cartTotal = useAtomValue(cartTotalAtom);

  const clickHandler = useCallback(
    () => setCart((c) => (c.items.length !== 0 ? { ...c, open: !c.open } : c)),
    [setCart],
  );

  return (
    <section className="p-1">
      <Button onClick={clickHandler}>
        <ShoppingCart />
        My Cart
      </Button>
      {cartTotal.quantity > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 w-4 h-4 rounded-full text-xs text-center">
          {cartTotal.quantity}
        </span>
      )}
    </section>
  );
};

export default CartNavButton;
