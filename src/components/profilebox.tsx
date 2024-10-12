"use client";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useQuery } from "@tanstack/react-query";
import { SampleUser } from "@/assets";
import Image from "next/image";
import { RiTwitterXFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import Link from "next/link";
import { Link2 } from "iconsax-react";

const ProfileBox = () => {
  const fetchUserProfile = async () => {
    const res = await axiosInstance.get(apiRoutes.USER);
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["basicprofile"],
    queryFn: () => fetchUserProfile(),
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const socialLinks = [
    {
      name: "Farcaster",
      icon: <SiFarcaster width={24} size={24} color="#7880E9" />,
      url: "",
    },
    {
      name: "Twitter",
      icon: <RiTwitterXFill width={24} size={24} color="#7880E9" />,
      url: "",
    },
    {
      name: "Instagram",
      icon: <AiFillInstagram width={24} size={24} color="#7880E9" />,
      url: "",
    },
    {
      name: "Facebook",
      icon: <FaFacebook width={24} size={24} color="#7880E9" />,
      url: "",
    },
  ] as const;

  return (
    <div className="p-6 my-0 mx-auto rounded-2xl">
      <div className="min-h-[300px] bg-white p-[56px] rounded-2xl grid gap-5">
        <Image
          src={data?.avatarUrl ? data?.avatarUrl : SampleUser}
          alt="user_avatar"
          className="rounded-[100px] w-32 h-32"
          width={128}
          height={128}
        />
        <div className="grid gap-1">
          <h1 className="text-2xl font-bricolage-grotesque font-bold">
            {data?.fullname}
          </h1>
          <span className="text-[13px] text-[#667085]">@{data?.username}</span>
        </div>
        <p className="text-sm font-plus-jakarta font-normal text-[#667085]">
          {data?.bio}
        </p>
        <div className="flex items-center gap-[10px]">
          {data?.social?.length > 0 &&
            socialLinks.map(({ name, icon, url }, idx) => (
              <Link key={idx} href={url}>
                <button key={idx} className="">
                  {icon}
                </button>
              </Link>
            ))}
        </div>
        <div className="bg-[#EAECF0] h-[1px] w-full my-3" />
        <div className="grid grid-cols-3 gap-3">
          {data?.extraLinks?.length > 0 &&
            data?.extraLinks.map(
              (
                {
                  url,
                  title,
                  description,
                }: { url: string; title: string; description: string },
                idx: number
              ) => (
                <div
                  className="bg-[#F9FAFB] py-2 px-3 min-h-[51px] rounded-xl grid gap-[10px]"
                  key={idx}
                >
                  <button
                    key={idx}
                    className="text-sm font-plus-jakarta font-normal text-[#1D2939] flex items-center gap-2"
                  >
                    <Link href={url}>
                      <Link2 size="18" cursor="pointer" color="#7880E9" />
                    </Link>
                    {title}
                  </button>
                  <p className="text-[13px] text-[#667085] font-plus-jakarta font-medium">{`${description?.slice(
                    0,
                    40
                  )}...`}</p>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
