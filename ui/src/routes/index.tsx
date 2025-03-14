import { createFileRoute } from "@tanstack/react-router";
import BookList from "@/components/book/list";
import { useAtomValue } from "jotai/react";
import { isCartOpenAtom } from "@/state/shopping-cart";
import CartList from "@/components/cart/list";
import BookSearch from "@/components/book/search";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const open = useAtomValue(isCartOpenAtom);

  return (
    <>
      <BookSearch />
      <section className="px-4">
        <h5 className="text-lg font-semibold mb-4">Books</h5>
        <section className={open ? "flex gap-4" : ""}>
          <BookList />
          <CartList />
        </section>
      </section>
    </>
  );
}
