"use client";
import { Call, Sms } from "iconsax-react";
import Link from "next/link";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/spinner";

const ContactLinksComponent = () => {
  const fetchPorfolios = async () => {
    const res = await axiosInstance.get(apiRoutes.PORTFOLIO);
    return res.data;
  };

  const { isLoading } = useQuery({
    queryKey: ["fetchportfolios"],
    queryFn: () => fetchPorfolios(),
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const socialLinks = [
    {
      name: "Email",
      icon: <Sms size="18" />,
      url: "email",
    },
    {
      name: "Phone",
      icon: <Call size="18" />,
      url: "phone",
    },
  ];

  return (
    <div className="mt-1 grid gap-3">
      <p className="text-sm font-normal font-plus-jakarta text-[#667085] max-w-[320px] leading-5">
        Add your preferred contact details so people can get in touch with you
        directly.
      </p>
      <div className="bg-[#EAECF0] h-[1px] w-full my-5" />

      <div className="grid place-items-center">{isLoading && <Spinner />}</div>
      {!isLoading && (
        <div className="grid gap-3">
          {socialLinks?.map(
            (
              {
                name,
                icon,
                url,
              }: { name: string; icon: JSX.Element; url: string },
              idx: number
            ) => (
              <Link
                href={`/contact/${url}`}
                key={idx}
                className="w-full flex items-center gap-2 bg-white py-4 px-5 min-h-[51px] rounded-xl"
              >
                {icon}
                <button className="w-full rounded-xl text-sm font-plus-jakarta font-normal text-[#1D2939] flex items-center gap-2">
                  {name}
                </button>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ContactLinksComponent;
