"use client";
import {
  ProfileCircle,
  TextBlock,
  User,
  Link as Linkx,
  Link21,
  Sms,
  Gameboy,
  GalleryEdit,
} from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const navLinks = [
    {
      name: "Home",
      url: "/dashboard",
      icon: <User size="18" variant="Bulk" />,
    },
    {
      name: "Basic Info",
      url: "/basic-info",
      icon: <User size="18" variant="Outline" />,
    },
    {
      name: "Avatar",
      url: "/avatar",
      icon: <ProfileCircle size="18" variant="Outline" />,
    },
    {
      name: "Wallet Addresses",
      url: "/wallet-address",
      icon: <TextBlock size="18" variant="Outline" />,
    },
    {
      name: "Connect Social Links",
      url: "/social-links",
      icon: <Linkx size="18" variant="Outline" />,
    },
    {
      name: "More Links",
      url: "/more-links",
      icon: <Link21 size="18" variant="Outline" />,
    },
    {
      name: "Contact",
      url: "/contact",
      icon: <Sms size="18" variant="Outline" />,
    },
    {
      name: "Interests",
      url: "/interests",
      icon: <Gameboy size="18" variant="Outline" />,
    },
    {
      name: "Photos",
      url: "/photos",
      icon: <GalleryEdit size="18" variant="Outline" />,
    },
  ] as const;

  const path = usePathname();
  return (
    <div className="w-[398px] min-h-[878px] h-full p-4">
      <div className="min-h-[846px] h-full bg-[#F9FAFB] rounded-2xl py-5 px-4">
        <h2 className="text-base font-plus-jakarta font-semibold">
          Personal Information
        </h2>
        <div className="flex flex-col gap-4 mt-4">
          {navLinks.map(({ name, url, icon }, idx) => (
            <Link
              href={url}
              key={idx}
              className={`py-[10px] px-4 text-[#667085] font-plus-jakarta text-sm font-normal flex justify-between items-center hover:bg-white hover:text-[#7880E9] rounded-[8px] ${
                url === path &&
                "bg-white rounded-[8px] text-[#7880E9] font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                {icon}
                {name}
              </div>
              {url === path && <ChevronRight />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
