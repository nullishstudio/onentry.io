import { Button } from "./ui/button";
import Image from "next/image";
import { OnentryIoLogo } from "@/assets";
export default function TopNavigation() {
  return (
    <div className="flex items-center justify-between my-0 mx-auto md:max-w-[1440px] w-[90%] py-6 h-20">
      <div className="logo cursor-pointer">
        <Image src={OnentryIoLogo} alt="onentryio" />
      </div>
      <div className="connection_btn">
        <Button className="text-[#7880E9] bg-white border border-[#7880E9] shadow-none font-plus-jakarta font-medium text-[15px] leading-[18px] min-h-12 rounded-xl py-[18px] px-5 cursor-pointer hover:bg-[#7880E9] hover:text-white">
          Connect Wallet
        </Button>
      </div>
    </div>
  );
}
