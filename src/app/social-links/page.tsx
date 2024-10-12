"use client";
import Dashboardlayout from "@/layout/dashboardlayout";
import SocialLinksComponent from "./components/social-links";
import ProfileBox from "@/components/profilebox";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useQuery } from "@tanstack/react-query";

const SocialLinks = () => {
  const fetchUserProfile = async () => {
    const res = await axiosInstance.get(apiRoutes.USER);
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["fulluserforsocial"],
    queryFn: () => fetchUserProfile(),
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Dashboardlayout
      title="Add Social Media"
      element={<SocialLinksComponent data={data} />}
    >
      <ProfileBox />
    </Dashboardlayout>
  );
};

export default SocialLinks;
