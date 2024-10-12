"use client";
import { RiTwitterXFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { SiFarcaster } from "react-icons/si";
import { InfoCircle } from "iconsax-react";
import { Github, Link } from "lucide-react";
import { AiOutlineDiscord } from "react-icons/ai";

interface SocialProps {
  data: {
    twitter: string;
    github: string;
    farcaster: string;
    telegram: string;
    discord: string;
    url: string;
  };
}

const SocialLinksComponent = ({ data }: SocialProps) => {
  const socialLinks = [
    {
      name: "Farcaster",
      icon: <SiFarcaster width={22} size={22} color="#7880E9" />,
      connected: data?.farcaster,
    },
    {
      name: "Twitter",
      icon: <RiTwitterXFill width={22} size={22} color="#7880E9" />,
      connected: data?.twitter,
      url: data?.twitter,
    },
    {
      name: "GitHub",
      icon: <Github width={22} size={22} color="#7880E9" />,
      connected: data?.github,
      url: data?.github,
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane width={22} size={22} color="#7880E9" />,
      connected: data?.telegram,
      url: data?.telegram,
    },
    {
      name: "Discord",
      icon: <AiOutlineDiscord width={22} size={22} color="#7880E9" />,
      connected: data?.discord,
      url: data?.discord,
    },
    {
      name: "URL",
      icon: <Link width={22} size="22" color="#7880E9" />,
      connected: data?.url,
      url: data?.url,
    },
  ] as const;

  return (
    <div className="mt-1 grid gap-3">
      <p className="text-sm font-normal font-plus-jakarta text-[#667085] max-w-[320px] leading-5">
        Connect your profiles and share your social presence. Add as many social
        links as you like to showcase all your platforms.
      </p>
      <div className="text-xs text-[#090a0b] flex gap-2 font-plus-jakarta">
        <div>
          <InfoCircle size="14" width={20} variant="Bold" color="green" />
        </div>
        Your social profile is automatically fetched using basename if connected
        during setup. Manual connection is still base(ing) soon!
      </div>
      <div className="bg-[#EAECF0] h-[1px] w-full my-5" />
      <div className="grid gap-3">
        {socialLinks.map(({ name, icon, connected }, idx) => (
          <div
            key={idx}
            className="flex w-full items-center justify-between bg-white py-4 px-5 min-h-[51px] rounded-xl"
          >
            <button
              key={idx}
              className="text-base font-plus-jakarta font-medium text-[#667085] flex items-center gap-2"
            >
              {icon}
              {name}
            </button>
            <div className="border rounded-[6px] text-xs text-[#667085] cursor-pointer py-[6px] px-2 font-plus-jakarta border-[#EAECF0] hover:bg-[linear-gradient(91deg,_#FCE4FF_2.91%,_#FFEBD7_99.03%)] hover:border-[#FCE4FF]">
              {connected && "Connected"}
              {!connected && "Not Connected"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksComponent;
