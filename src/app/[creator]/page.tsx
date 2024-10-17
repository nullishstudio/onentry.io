"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Link1, Link2, Sms } from "iconsax-react";
import { Skeleton } from "@/components/ui/skeleton";
import { RiTwitterXFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { SiFarcaster } from "react-icons/si";
import { Github, Link as LinkURL } from "lucide-react";
import { AiOutlineDiscord } from "react-icons/ai";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useQuery } from "@tanstack/react-query";
import { SampleUser } from "@/assets";
import Link from "next/link";
import { dispatchtoast } from "@/components/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FloatingMobileMenu from "@/components/floating-menu";

const Creator = () => {
  const params = useParams();
  const username = params?.creator;
  const fetchUserProfile = async () => {
    const res = await axiosInstance.get(
      `${apiRoutes.PUBLIC_PROFILE}/${username}`
    );
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["public_creator"],
    queryFn: () => fetchUserProfile(),
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  console.log(data);

  const socialLinks = [
    {
      name: "Farcaster",
      icon: <SiFarcaster width={22} size={22} color="#7880E9" />,
      connected: data?.farcaster,
      url: data?.farcaster,
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
      icon: <LinkURL width={22} size="22" color="#7880E9" />,
      connected: data?.url,
      url: data?.url,
    },
  ] as const;

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
    <div className="bg-white p-6 ab">
      <div className="bg-[linear-gradient(156deg,_#C0DFFF_0.83%,_#FFF2FC_44.55%,_#DEDBFF_89.92%)] min-h-dvh rounded-[32px] py-6 px-4 lg:px-[196px] flex gap-4">
        <div className="bg-white min-h-[500px] w-full my-0 mx-auto rounded-[32px] p-4 lg:p-10">
          {isLoading && (
            <>
              <div className="min-h-[300px] bg-white md:p-[56px] rounded-2xl grid gap-5">
                <Skeleton className="rounded-[100px] w-32 h-32" />
                <div className="grid gap-1">
                  <Skeleton className="h-5 w-[136px] rounded-md" />
                  <Skeleton className="h-3 w-[136px] rounded-md" />
                  <p className="text-sm font-plus-jakarta font-normal text-[#667085]">
                    <Skeleton className="h-28 w-full" />
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <Skeleton className="py-2 px-3 min-h-[51px] rounded-xl grid gap-[10px]" />
                    <Skeleton className="py-2 px-3 min-h-[51px] rounded-xl grid gap-[10px]" />
                    <Skeleton className="py-2 px-3 min-h-[51px] rounded-xl grid gap-[10px]" />
                  </div>
                </div>
              </div>
            </>
          )}
          {!isLoading && (
            <>
              <>
                {data?.username && (
                  <div className="min-h-[300px] bg-white p-4 md:p-[56px] rounded-2xl grid gap-5">
                    {isLoading ? (
                      <Skeleton className="rounded-[100px] w-32 h-32" />
                    ) : (
                      <Image
                        src={data?.avatarUrl ? data?.avatarUrl : SampleUser}
                        alt="user_avatar"
                        className="rounded-[100px] w-32 h-32"
                        width={128}
                        height={128}
                      />
                    )}
                    <div className="grid gap-1">
                      {isLoading ? (
                        <>
                          <Skeleton className="h-5 w-[136px] rounded-md" />
                          <Skeleton className="h-3 w-[136px] rounded-md" />
                        </>
                      ) : (
                        <>
                          <h1 className="text-2xl font-bricolage-grotesque font-bold">
                            {data?.fullname}
                          </h1>
                          <span className="text-[13px] text-[#667085] font-plus-jakarta">
                            @{data?.username}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm font-plus-jakarta font-normal text-[#667085]">
                      {isLoading && <Skeleton className="h-28 w-full" />}
                      {!isLoading && <>{data?.bio}</>}
                    </p>
                    <div className="flex items-center gap-[10px]">
                      {socialLinks.map(({ icon, url }, idx) => (
                        <Link key={idx} href={url ? url : "#"}>
                          <button key={idx} className="text-[#7880E9]">
                            {icon}
                          </button>
                        </Link>
                      ))}
                    </div>
                    <div className="bg-[#EAECF0] h-[1px] w-full my-3" />
                    <h2 className="font-plus-jakarta text-base text-[#1D2939] font-semibold">
                      Portfolio
                    </h2>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                      {isLoading && (
                        <>
                          <Skeleton className="py-2 px-3 min-h-[51px] rounded-xl grid gap-[10px]" />
                          <Skeleton className="py-2 px-3 min-h-[51px] rounded-xl grid gap-[10px]" />
                        </>
                      )}

                      {!isLoading && (
                        <>
                          {data?.extraLinks?.length > 0 &&
                            data?.extraLinks.map(
                              (
                                {
                                  url,
                                  title,
                                  description,
                                }: {
                                  url: string;
                                  title: string;
                                  description: string;
                                },
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
                                    <Link href={url ? url : "#"}>
                                      <Link2
                                        size="18"
                                        cursor="pointer"
                                        color="#7880E9"
                                      />
                                    </Link>
                                    {title}
                                  </button>
                                  <p className="text-[13px] text-[#667085] font-plus-jakarta font-normal">{`${description?.slice(
                                    0,
                                    40
                                  )}...`}</p>
                                </div>
                              )
                            )}
                        </>
                      )}
                    </div>
                    <div className="bg-[#EAECF0] h-[1px] w-full my-3" />
                    <div>
                      <h2 className="font-plus-jakarta text-base text-[#1D2939] font-semibold">
                        Gallery/NFTs
                      </h2>
                      <div className="mt-3 grid md:grid-cols-4 grid-cols-2 gap-3">
                        {isLoading && (
                          <>
                            {Array(4)
                              .fill({})
                              .map((itm) => (
                                <Skeleton
                                  key={itm}
                                  className="py-2 px-3 min-h-[156px] rounded-xl grid gap-[10px] w-full"
                                />
                              ))}
                          </>
                        )}
                        {!isLoading && (
                          <>
                            {data?.avatar?.map(
                              ({
                                id,
                                avatarUrl,
                              }: {
                                id: string;
                                avatarUrl: string;
                              }) => (
                                <Image
                                  src={avatarUrl}
                                  key={id}
                                  alt="avatar"
                                  height={156}
                                  width={156}
                                  className="h-[100px] md:h-[160px] w-full rounded-xl cursor-pointer"
                                />
                              )
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
              <></>
            </>
          )}
        </div>

        {/* Menu web */}
        <div className="h-fit rounded-2xl p-4 hidden gap-4 bg-white/30 backdrop-blur-xl md:grid">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="bg-white rounded-full w-[52px] h-[52px] grid place-items-center cursor-pointer"
                  onClick={handleCopyLink}
                  role="button"
                >
                  <Link1 size="18" color="#667085" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-[#667085] font-plus-jakarta text-sm">
                <p>Copy shareable link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-white rounded-full w-[52px] h-[52px] grid place-items-center cursor-pointer">
                  <Link href={`mailto:${data?.email}`} target="_blank">
                    <Sms size="18" color="#667085" />
                  </Link>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-[#667085] font-plus-jakarta text-sm">
                <p>Send email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* Menu Mobile */}
        <div className="md:hidden block">
          <FloatingMobileMenu data={data} />
        </div>
      </div>
    </div>
  );
};

export default Creator;
