import { useAtom } from "jotai/react";
import { useCallback, useEffect, useRef } from "react";
import getBooks from "@/api/getBooks";
import { booksAtom } from "@/state/books";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BookSearch = () => {
  const [{ loading }, setBooks] = useAtom(booksAtom);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const searchBooks = useCallback(
    (query = "nosql") => {
      setBooks({ loading: true, response: [] });
      getBooks(query)
        .then((books) => setBooks({ loading: false, response: books }))
        .catch(() => setBooks({ loading: false, response: [] }));
    },
    [setBooks],
  );

  useEffect(() => {
    searchBooks();
  }, [searchBooks]);

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!buttonRef.current) return;
      buttonRef.current.disabled = e.target.value.trim() === "";
    },
    [buttonRef],
  );

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      searchBooks(e.currentTarget?.q.value);
    },
    [searchBooks],
  );

  return (
    <form className="mb-4 flex gap-4" onSubmit={submitHandler}>
      <Input name="q" defaultValue="nosql" onChange={inputChangeHandler} />
      <Button ref={buttonRef} type="submit">
        {loading ? <Loader2 className="animate-spin" /> : <Search />}
        Search
      </Button>
    </form>
  );
};

export default BookSearch;
