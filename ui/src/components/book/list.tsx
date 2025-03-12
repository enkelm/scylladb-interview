import type { IBook } from "@/api/types";
import BookCard from "./card";

type IProps = { books: IBook[] };
const BookList = ({ books }: IProps) => {
  return (
    <section className="flex flex-col justify-center gap-4">
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </section>
  );
};

export default BookList;
