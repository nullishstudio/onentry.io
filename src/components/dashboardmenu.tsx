import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HambergerMenu } from "iconsax-react";
import { ReactNode } from "react";

const DashboardMobileMenu = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <button className="rounded-full h-12 w-12 grid place-items-center cursor-pointer bg-white">
          <HambergerMenu size="28" color="#000" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className={className}>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default DashboardMobileMenu;
