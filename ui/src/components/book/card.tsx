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
import { Skeleton } from "@/components/ui/skeleton";

export const BookCardSkeleton = () => {
  return (
    <Card className="flex-row gap-4 px-4">
      <section></section>
      {/* <img src={book.image} alt={book.title} /> */}
      <Skeleton className="w-24 h-32" />
      <section className="flex flex-col gap-2">
        <CardHeader>
          <CardTitle className="font-semibold">
            <Skeleton />
          </CardTitle>
          <CardDescription className="text-sm font-extralight">
            <Skeleton />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton />
          <div className="my-2">
            <Skeleton />
            <Skeleton />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton />
        </CardFooter>
      </section>
    </Card>
  );
};

type IProps = {
  book: IBook;
};
const BookCard = ({ book }: IProps) => {
  const setCart = useSetAtom(cartAtom);
  const addToCartHandler = () =>
    setCart((c) => {
      if (c.items.length === 0) {
        return {
          open: false,
          items: [{ id: book.id, quantity: 1 }],
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
          quantity: 1,
        });
      }
      return newCart;
    });

  return (
    <Card key={book.id} className="flex-row gap-4 px-4">
      <img src={book.image} alt={book.title} />
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
