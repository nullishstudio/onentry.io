"use client";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useQuery } from "@tanstack/react-query";
import { SampleUser } from "@/assets";
import Image from "next/image";

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
      </div>
    </div>
  );
};

export default ProfileBox;
