import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

const BookCardSkeleton = () => {
  return (
    <Card className="flex-row gap-2 px-4 min-w-[calc(100vw-31rem)]">
      <Skeleton className="max-w-[300px] max-h-[300px] w-[150px] h-[200px] self-start" />
      <section className="flex flex-1 flex-col gap-2">
        <CardHeader>
          <CardTitle className="font-semibold">
            <Skeleton className="h-6 w-3/4" />
          </CardTitle>
          <CardDescription className="text-sm font-extralight">
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4 mb-3" />

          <div className="my-2">
            <Skeleton className="h-4 w-1/3 mb-1" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </section>
    </Card>
  );
};

export default BookCardSkeleton;
