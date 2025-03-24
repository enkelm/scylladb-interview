import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Route } from "@/routes";

const BookPagination = () => {
  const { page } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={
              page > 0
                ? () => {
                    navigate({
                      search: (prev) => ({ ...prev, page: prev.page - 1 }),
                    });
                  }
                : undefined
            }
          />
        </PaginationItem>
        {page > 0 && (
          <PaginationItem>
            <PaginationEllipsis
              onClick={() =>
                navigate({ search: (prev) => ({ ...prev, page: 0 }) })
              }
            />
          </PaginationItem>
        )}
        {new Array(3).fill(undefined).map((_, index) => {
          const value = page + index;
          return (
            <PaginationItem key={`pagination-${value}`}>
              <PaginationLink
                isActive={value === page}
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, page: value }) })
                }
              >
                {value + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, page: prev.page + 1 }) })
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default BookPagination;
