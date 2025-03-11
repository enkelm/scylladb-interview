import { createFileRoute } from "@tanstack/react-router";
import type { Book } from "@/api/types";
import BookList from "@/components/book/list";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const books = new Array<Book>(10).fill({
  id: crypto.randomUUID(),
  img: "https://picsum.photos/200",
  title: "Book Title",
  author: "Author Name",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat obcaecati aliquam excepturi beatae repudiandae reiciendis debitis repellat sapiente dolor laborum ex velit, illum vel adipisci iusto quis dolores maxime error sed similique accusamus? Dolore molestias repellat cum quo omnis labore, tenetur saepe voluptatem, hic, minus earum. Voluptas velit sapiente dignissimos. Voluptate distinctio dolorem reiciendis aut quis sunt et in, autem ipsam iste a placeat delectus. Omnis quae iure placeat. Aliquam, quas architecto. Beatae, laboriosam explicabo obcaecati sint fugiat enim corporis reiciendis recusandae perferendis veniam? Laudantium, ea. Veritatis tenetur molestias iusto nesciunt rerum, quis sed a adipisci pariatur placeat iure debitis.",
  pageCount: 300,
  price: 19.99,
});

function RouteComponent() {
  return (
    <>
      <BookList books={books} />
    </>
  );
}
