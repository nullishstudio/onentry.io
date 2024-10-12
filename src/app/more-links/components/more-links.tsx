"use client";
import { Link2 } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/spinner";

const MoreLinksComponent = () => {
  const fetchPorfolios = async () => {
    const res = await axiosInstance.get(apiRoutes.PORTFOLIO);
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetchportfolios"],
    queryFn: () => fetchPorfolios(),
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="mt-1 grid gap-3">
      <p className="text-sm font-normal font-plus-jakarta text-[#667085] max-w-[320px] leading-5">
        Add as many links as you need, like portfolios, projects, or anything
        else that represents you.
      </p>
      <div className="bg-[#EAECF0] h-[1px] w-full my-5" />

      <div className="grid place-items-center">{isLoading && <Spinner />}</div>
      {!isLoading && (
        <div className="grid gap-3">
          {data?.length > 0 &&
            data?.map(
              ({ title, url }: { title: string; url: string }, idx: number) => (
                <button
                  key={idx}
                  className="rounded-xl bg-white text-sm font-plus-jakarta font-normal text-[#667085] py-4 px-5 min-h-[51px] flex items-center gap-2"
                >
                  <Link href={url}>
                    <Link2 size="18" cursor="pointer" color="#7880E9" />
                  </Link>
                  {title}
                </button>
              )
            )}
        </div>
      )}

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
