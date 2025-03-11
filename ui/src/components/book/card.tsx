import type { Book } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type IProps = {
  book: Book;
};
const BookCard = ({ book }: IProps) => {
  return (
    <Card key={book.id} className="flex-row gap-4 px-4">
      <img width="200" height="200" src={book.img} alt={book.title} />
      <section className="flex flex-col gap-2">
        <div>
          <p className="font-semibold">{book.title}</p>
          <p className="text-sm font-extralight">{book.author}</p>
        </div>
        <p>{book.description}</p>
        <div>
          <p>Pages:&nbsp;{book.pageCount}</p>
          <p>Price:&nbsp;${book.price}</p>
        </div>
        <Button>Add to cart</Button>
      </section>
    </Card>
  );
};

export default BookCard;
