import { createFileRoute } from "@tanstack/react-router";
import BookList from "@/components/book/list";
import { useAtom, useAtomValue } from "jotai/react";
import { isCartOpenAtom } from "@/state/shopping-cart";
import CartList from "@/components/cart/list";
import { useCallback, useEffect } from "react";
import getBooks from "@/api/getBooks";
import { booksAtom } from "@/state/books";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const open = useAtomValue(isCartOpenAtom);
  const [{ loading, response: books }, setBooks] = useAtom(booksAtom);

  const searchBooksHandler = useCallback(
    (query = "nosql") => {
      setBooks((b) => ({ ...b, loading: true }));
      getBooks(query)
        .then((books) => setBooks({ loading: false, response: books }))
        .catch(() => setBooks({ loading: false, response: [] }));
    },
    [setBooks],
  );

  useEffect(() => {
    searchBooksHandler();
  }, [searchBooksHandler]);

  return (
    <>
      <form
        className="px-4 mb-4 flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          searchBooksHandler(e.currentTarget?.q.value);
        }}
      >
        <Input name="q" defaultValue="nosql" />
        <Button type="submit">
          <Search />
          Search
        </Button>
      </form>
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
