"use client";
import { RiTwitterXFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";

const SocialLinksComponent = () => {
  const socialLinks = [
    {
      name: "Farcaster",
      icon: <SiFarcaster width={22} size={22} color="#000" />,
    },
    {
      name: "Twitter",
      icon: <RiTwitterXFill width={22} size={22} color="#000" />,
    },
    {
      name: "Instagram",
      icon: <AiFillInstagram width={22} size={22} color="#000" />,
    },
    {
      name: "Facebook",
      icon: <FaFacebook width={22} size={22} color="#000" />,
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
        {socialLinks.map(({ name, icon }, idx) => (
          <button
            key={idx}
            className="rounded-xl bg-white text-base font-plus-jakarta font-medium text-[#667085] py-4 px-5 min-h-[51px] flex items-center gap-2"
          >
            {icon}
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksComponent;
