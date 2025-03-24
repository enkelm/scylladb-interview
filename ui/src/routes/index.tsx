import { createFileRoute } from "@tanstack/react-router";
import BookList from "@/components/book/list";
import { useAtomValue } from "jotai/react";
import { isCartOpenAtom } from "@/state/shopping-cart";
import CartList from "@/components/cart/list";
import BookSearch from "@/components/book/search";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search?.q as string) ?? "nosql",
      page: Number(search?.page ?? 0),
    };
  },
});

function RouteComponent() {
  const open = useAtomValue(isCartOpenAtom);

  return (
    <>
      <section className={`${open ? "flex gap-4" : ""} px-4`}>
        <div>
          <BookSearch />
          <h5 className="text-lg font-semibold mb-4">Books</h5>
          <BookList />
        </div>
        <CartList />
      </section>
    </>
  );
}
