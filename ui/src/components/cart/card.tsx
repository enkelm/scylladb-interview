import { cartAtom, ShoppingCartItem } from "@/state/shopping-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { useSetAtom } from "jotai";

type IProps = {
  item: ShoppingCartItem & { index: number; name: string; price: number };
};
const CartItemCard = ({ item }: IProps) => {
  const setCart = useSetAtom(cartAtom);

  const updateItemQuantity = (quantity: number) => {
    setCart((prevCart) => {
      const newCart = structuredClone(prevCart);

      if (quantity <= 0) {
        newCart.items.splice(item.index, 1);
      } else {
        newCart.items[item.index].quantity = quantity;
      }

      if (newCart.items.length === 0) {
        newCart.open = false;
      }
      return newCart;
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateItemQuantity(newQuantity);
  };

  return (
    <Card className="gap-4">
      <CardHeader className="felx flex-row justify-between items-center">
        <CardTitle>{item.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateItemQuantity(0)}
        >
          <CircleX />
        </Button>
      </CardHeader>
      <CardContent className="flex gap-3 items-center">
        <Input
          type="number"
          value={item.quantity}
          min="0"
          onChange={changeHandler}
        />
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
