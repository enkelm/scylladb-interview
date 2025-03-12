import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./theme/toggle";
import CartNavButton from "./cart/nav-button";

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
          <CartNavButton />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
