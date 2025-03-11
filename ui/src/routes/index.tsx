import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div>Hello World</div>
      <Button>Click Me</Button>
    </div>
  );
}
