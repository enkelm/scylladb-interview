import { useAtomValue } from "jotai";
import BookCard from "./card";
import BookCardSkeleton from "./card-skeleton";
import { booksAtom } from "@/state/books";
import { memo } from "react";

const BookList = memo(() => {
  const { loading, response: books } = useAtomValue(booksAtom);

  const booksList = !loading
    ? books.map((b) => <BookCard key={b.id} book={b} />)
    : new Array(5).fill(<BookCardSkeleton />);

  return (
    <section className="flex flex-col justify-center gap-4">
      {booksList}
    </section>
  );
});

export default BookList;
