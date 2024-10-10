"use client";

import { Textarea } from "@/components/ui/textarea";
import AppButton from "@/components/button";
import Image from "next/image";
import { UserAvatarOne, UserAvatarTwo } from "@/assets";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";

const AvatarForm = () => {
  const imgArray = [UserAvatarOne, UserAvatarTwo];
  return (
    <div className="mt-1 grid gap-3">
      <p className="text-sm font-normal font-plus-jakarta text-[#667085] max-w-[320px] leading-5">
        Express yourself with custom avatars! Add as many as you like, and
        switch your display avatar anytime.
      </p>
      <div className="bg-[#EAECF0] h-[1px] w-full my-5" />
      <div className="grid grid-cols-3 gap-3">
        {imgArray.map((avtr, idx) => (
          <Image
            src={avtr}
            key={idx}
            alt="avatar"
            className="cursor-pointer min-w-[100px] w-full h-[100px] rounded-[8px] hover:border-2 hover:border-[#7880E9] shadow-[#7880E9]"
            width={100}
            height={100}
          />
        ))}
      </div>
      <div className="grid gap-3 mt-5">
        <Button
          variant={undefined}
          className="text-[#7880E9] text-base font-semibold font-plus-jakarta py-3 px-5 min-h-12 rounded-xl bg-white shadow-none hover:bg-white flex items-center gap-2"
        >
          <Plus /> Upload Avatar
        </Button>
        <Button
          variant={undefined}
          className="text-[#7880E9] h-12 border border-[#7880E9] text-base font-semibold font-plus-jakarta py-3 px-5 min-h-12 rounded-xl bg-white shadow-none hover:bg-white"
        >
          Choose From NFTs
        </Button>
      </div>
      <div className="flex flex-col self-end justify-end relative">
        <AppButton text="Save" className="mt-5" />
      </div>
    </div>
  );
};

export default AvatarForm;
