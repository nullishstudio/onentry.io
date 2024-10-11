"use client";

import Dashboardlayout from "@/layout/dashboardlayout";
import BasicInfoForm from "./components/basicinfo-form";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useQuery } from "@tanstack/react-query";
import ProfileBox from "@/components/profilebox";

const BasicInfo = () => {
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
    <Dashboardlayout element={<BasicInfoForm data={data} />} title="Basic Info">
      <ProfileBox />
    </Dashboardlayout>
  );
};

export default BasicInfo;
