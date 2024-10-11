import { SampleUser } from "@/assets";
import Dashboardlayout from "@/layout/dashboardlayout";
import Image from "next/image";
import SocialLinksComponent from "./components/social-links";
import ProfileBox from "@/components/profilebox";

const SocialLinks = () => {
  return (
    <Dashboardlayout
      title="Add Social Media"
      element={<SocialLinksComponent />}
    >
      <ProfileBox />
    </Dashboardlayout>
  );
};

export default SocialLinks;
