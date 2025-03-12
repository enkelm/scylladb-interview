import type { IBook } from "@/api/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cartAtom } from "@/state/shopping-cart";
import { useSetAtom } from "jotai";

type IProps = {
  book: IBook;
};
const BookCard = ({ book }: IProps) => {
  const setCart = useSetAtom(cartAtom);
  const addToCartHandler = () =>
    setCart((c) => {
      if (!c.items && !c.total) {
        return {
          open: false,
          items: [
            { id: book.id, name: book.title, quantity: 1, price: book.price },
          ],
          total: { price: book.price, quantity: 1 },
        };
      }

      const newCart = structuredClone(c);
      const existingIdx = newCart.items.findIndex(
        (item) => item.id === book.id,
      );
      if (existingIdx !== -1) {
        newCart.items[existingIdx].quantity += 1;
      } else {
        newCart.items.push({
          id: book.id,
          name: book.title,
          quantity: 1,
          price: book.price,
        });
      }
      newCart.total.price += book.price;
      newCart.total.quantity += 1;
      return newCart;
    });

  return (
    <Card key={book.id} className="flex-row gap-4 px-4">
      <img width="200" height="200" src={book.img} alt={book.title} />
      <section className="flex flex-col gap-2">
        <CardHeader>
          <CardTitle className="font-semibold">{book.title}</CardTitle>
          <CardDescription className="text-sm font-extralight">
            {book.author}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{book.description}</p>
          <div className="my-2">
            <p>Pages:&nbsp;{book.pageCount}</p>
            <p>Price:&nbsp;${book.price}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={addToCartHandler}>
            Add to cart
          </Button>
        </CardFooter>
      </section>
    </Card>
  );
};

export default BookCard;
