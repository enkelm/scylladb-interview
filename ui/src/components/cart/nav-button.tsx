import { useCallback } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "@/state/shopping-cart";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartNavButton = () => {
  const [cart, setCart] = useAtom(cartAtom);

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
      {cart.total.quantity > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 w-4 h-4 rounded-full text-xs text-center">
          {cart.total.quantity}
        </span>
      )}
    </section>
  );
};

export default CartNavButton;
