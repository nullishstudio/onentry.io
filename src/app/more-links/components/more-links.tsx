"use client";
import { Link2 } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const MoreLinksComponent = () => {
  const socialLinks = [
    {
      name: "Link one",
    },
    {
      name: "Link two",
    },
    {
      name: "Link three",
    },
    {
      name: "Link four",
    },
  ] as const;

  return (
    <div className="mt-1 grid gap-3">
      <p className="text-sm font-normal font-plus-jakarta text-[#667085] max-w-[320px] leading-5">
        Connect your profiles and share your social presence. Add as many social
        links as you like to showcase all your platforms.
      </p>
      <div className="bg-[#EAECF0] h-[1px] w-full my-5" />
      <div className="grid gap-3">
        {socialLinks.map(({ name }, idx) => (
          <button
            key={idx}
            className="rounded-xl bg-white text-sm font-plus-jakarta font-normal text-[#667085] py-4 px-5 min-h-[51px] flex items-center gap-2"
          >
            <Link2 size="18" />
            {name}
          </button>
        ))}
      </div>
      <div className="grid gap-3 mt-5">
        <Link href="/more-links/add" className="w-full">
          <Button
            variant={undefined}
            className="text-[#7880E9] w-full text-base font-semibold font-plus-jakarta py-3 px-5 min-h-12 rounded-xl bg-white shadow-none hover:bg-white flex items-center gap-2"
          >
            <Plus /> Add Link
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MoreLinksComponent;
