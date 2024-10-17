"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link1, Sms } from "iconsax-react";
import { dispatchtoast } from "./toast";
import Link from "next/link";

interface ProfileProps {
  data: {
    username: string;
    email: string;
  };
}

export default function FloatingMobileMenu({ data }: ProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleCopyLink = () => {
    if (data?.username) {
      const profileUrl = `https://onentryio-production.up.railway.app/${data.username}`;
      navigator.clipboard.writeText(profileUrl);
      dispatchtoast({
        text: "Creator link copied to clipboard!",
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Main menu button */}
        <Button
          size="icon"
          variant="default"
          className="h-14 w-14 rounded-full shadow-lg bg-[#7880E9] hover:bg-[bg-[#7880E9]"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Sub-menu items */}
        <div
          className={`absolute bottom-16 right-0 transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col items-end space-y-4">
            <div
              className="bg-white rounded-full w-[52px] h-[52px] grid place-items-center cursor-pointer"
              onClick={handleCopyLink}
              role="button"
            >
              <Link1 size="18" color="#667085" />
            </div>
            <div className="bg-white rounded-full w-[52px] h-[52px] grid place-items-center cursor-pointer">
              <Link href={`mailto:${data?.email}`} target="_blank">
                <Sms size="18" color="#667085" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
