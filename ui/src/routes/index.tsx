import { createFileRoute } from "@tanstack/react-router";
import BookList from "@/components/book/list";
import { useAtom, useAtomValue } from "jotai/react";
import { isCartOpenAtom } from "@/state/shopping-cart";
import CartList from "@/components/cart/list";
import { useEffect } from "react";
import getBooks from "@/api/getBooks";
import { booksAtom } from "@/state/books";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const open = useAtomValue(isCartOpenAtom);
  const [{ loading, response: books }, setBooks] = useAtom(booksAtom);

  useEffect(() => {
    setBooks((b) => ({ ...b, loading: true }));
    getBooks("nosql")
      .then((books) => setBooks({ loading: false, response: books }))
      .catch(() => setBooks({ loading: false, response: [] }));
  }, [setBooks]);

  return (
    <>
      <section className="px-4">
        <h5 className="text-lg font-semibold mb-4">Books</h5>
        <section className={open ? "flex gap-4" : ""}>
          <BookList loading={loading} books={books} />
          <CartList />
        </section>
      </section>
    </>
  );
}
