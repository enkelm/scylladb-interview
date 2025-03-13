import type { IBook } from "@/api/types";
import BookCard, { BookCardSkeleton } from "./card";

type IProps = { loading: boolean; books: IBook[] };
const BookList = ({ loading, books }: IProps) => {
  if (loading)
    return (
      <section className="flex flex-col justify-center gap-4">
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
      </section>
    );

  return (
    <section className="flex flex-col justify-center gap-4">
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </section>
  );
};

export default BookList;
