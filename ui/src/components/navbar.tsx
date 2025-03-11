import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { ModeToggle } from "./theme/toggle";

const Navbar = () => {
  return (
    <NavigationMenu className="w-full max-w-full px-8 py-4 mb-4 bg-accent justify-between">
      <NavigationMenuList>
        <NavigationMenuItem className="font-semibold">
          ScyllaDB Bookshop
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button>
            <ShoppingCart />
            My Cart
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
