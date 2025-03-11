import type { Book } from "@/api/types";
import BookCard from "./card";

type IProps = { books: Book[] };
const BookList = ({ books }: IProps) => {
  return (
    <section className="px-4">
      <h5 className="text-lg font-semibold mb-4">Books</h5>
      <section className="flex flex-col justify-center gap-4">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </section>
    </section>
  );
};

export default BookList;
