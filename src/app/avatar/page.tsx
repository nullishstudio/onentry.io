"use client";
import Dashboardlayout from "@/layout/dashboardlayout";
import AvatarForm from "./components/avatar";
import ProfileBox from "@/components/profilebox";

const Avatar = () => {
  return (
    <Dashboardlayout title="Avatar" element={<AvatarForm />}>
      <ProfileBox />
    </Dashboardlayout>
  );
};

export default Avatar;
