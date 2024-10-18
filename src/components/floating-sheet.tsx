"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Edit } from "iconsax-react";

interface FloatingSheetButtonProps {
  children: React.ReactNode;
}

export default function FloatingSheetButton({
  children,
}: FloatingSheetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="bg-[#7880E9] hover:bg-[#7880E9] rounded-full h-14 w-14 grid place-items-center cursor-pointer p-3">
            <Edit size="20" color="#fff" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full">
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
