import { OnentryIoLogo } from "@/assets";
import Image from "next/image";
import { Button } from "./ui/button";
import { Link2 } from "lucide-react";

export default function DashboardTopnav() {
  return (
    <div className="flex justify-between items-center border-b-[1.5px] border-[#EAECF0] max-w-[1440px] w-full py-5 px-6">
      <Image src={OnentryIoLogo} alt="logo" className="cursor-pointer" />
      <Button
        variant="outline"
        className="border-[#EAECF0] py-[10px] px-4 min-h-9 rounded-[100px] bg-none text-[#667085] text-sm font-medium font-plus-jakarta min-w-[143px] flex items-center gap-2 hover:bg-white"
      >
        Share profile <Link2 size={18} />
      </Button>
    </div>
  );
}
