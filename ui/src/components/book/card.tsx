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
import { useState } from "react";

enum ExpandedStatus {
  Default,
  Expanded,
  Collapsed,
}
const statusMap = new Map<ExpandedStatus, ExpandedStatus>([
  [ExpandedStatus.Default, ExpandedStatus.Default],
  [ExpandedStatus.Expanded, ExpandedStatus.Collapsed],
  [ExpandedStatus.Collapsed, ExpandedStatus.Expanded],
]);

const BookDescription = ({ description }: { description: string }) => {
  const [status, setStatus] = useState<ExpandedStatus | null>(null);

  const isExpanded = status === ExpandedStatus.Expanded;
  const isExpandedByDefault = status === ExpandedStatus.Default;

  const toggleExpandHandler = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length !== 0) return;
    setStatus((s) => {
      if (s === null) return s;
      return statusMap.get(s) ?? s;
    });
  };

  return (
    <p
      ref={(ref) => {
        if (!ref || status !== null) return;
        setStatus(
          ref.scrollHeight <= ref.clientHeight
            ? ExpandedStatus.Default
            : ExpandedStatus.Collapsed,
        );
      }}
      className={`${isExpanded || isExpandedByDefault ? "" : "max-h-24 line-clamp-3 hover:text-gray-500 dark:hover:text-gray-300"} ${isExpandedByDefault ? "" : "cursor-pointer"} text-sm overflow-hidden text-ellipsis transition-colors`}
      onClick={toggleExpandHandler}
    >
      {description}
    </p>
  );
};

type IBookCardProps = {
  book: IBook;
};
const BookAddToCartButton = ({ book }: IBookCardProps) => {
  const setCart = useSetAtom(cartAtom);
  const addToCartHandler = () =>
    setCart((c) => {
      if (c.items.length === 0) {
        return {
          open: false,
          items: [
            { id: book.id, name: book.title, price: book.price, quantity: 1 },
          ],
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
          price: book.price,
          quantity: 1,
        });
      }
      return newCart;
    });

  return (
    <Button className="w-full" onClick={addToCartHandler}>
      Add to cart
    </Button>
  );
};

const BookCard = ({ book }: IBookCardProps) => {
  return (
    <Card key={book.id} className="flex-row gap-2 px-4">
      <img
        src={book.image}
        alt={book.title}
        className="max-w-[300px] max-h-[300px] object-contain self-start"
      />
      <section className="flex flex-1 flex-col gap-2">
        <CardHeader>
          <CardTitle className="font-semibold">{book.title}</CardTitle>
          <CardDescription className="text-sm font-extralight">
            {book.author}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookDescription description={book.description} />
          <div className="my-2">
            <p>Pages:&nbsp;{book.pageCount}</p>
            <p>Price:&nbsp;${book.price}</p>
          </div>
        </CardContent>
        <CardFooter>
          <BookAddToCartButton book={book} />
        </CardFooter>
      </section>
    </Card>
  );
};

export default BookCard;
