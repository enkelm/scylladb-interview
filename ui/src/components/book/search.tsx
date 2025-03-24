import { useAtom } from "jotai/react";
import { useCallback, useEffect, useRef } from "react";
import getBooks from "@/api/getBooks";
import { booksAtom, initialBooksResponse } from "@/state/books";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookPagination from "./pagination";
import { Route } from "@/routes";

const BookSearch = () => {
  const { q, page } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [{ loading }, setBooks] = useAtom(booksAtom);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const searchBooks = useCallback(
    (query = q, index = page) => {
      setBooks({ loading: true, response: initialBooksResponse });
      getBooks(query, index)
        .then((response) => setBooks({ loading: false, response }))
        .catch(() =>
          setBooks({ loading: false, response: initialBooksResponse }),
        );
    },
    [page, q, setBooks],
  );

  useEffect(() => {
    searchBooks();
  }, [searchBooks]);

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!buttonRef.current) return;
      const q = e.target.value.trim();
      buttonRef.current.disabled = q === "";
    },
    [],
  );

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate({
        search: (prev) => ({ ...prev, q: e.currentTarget?.q.value }),
      });
    },
    [navigate],
  );

  return (
    <form className="mb-4 flex gap-4" onSubmit={submitHandler}>
      <Input name="q" defaultValue={q} onChange={inputChangeHandler} />
      <BookPagination />
      <Button ref={buttonRef} type="submit">
        {loading ? <Loader2 className="animate-spin" /> : <Search />}
        Search
      </Button>
    </form>
  );
};

export default BookSearch;
