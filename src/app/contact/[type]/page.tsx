"use client";
import Dashboardlayout from "@/layout/dashboardlayout";
import ProfileBox from "@/components/profilebox";
import ContactAddLinksComponent from "../components/contact-add";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useQuery } from "@tanstack/react-query";

const ContactLinksComponent = () => {
  const param = useParams();

  const fetchProfile = async () => {
    const res = await axiosInstance.get(apiRoutes.USER);
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () => fetchProfile(),
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Dashboardlayout
      title={param.type === "email" ? "Email" : "Phone"}
      element={<ContactAddLinksComponent data={data} />}
    >
      <ProfileBox />
    </Dashboardlayout>
  );
};

export default ContactLinksComponent;
