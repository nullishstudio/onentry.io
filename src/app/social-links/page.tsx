import Dashboardlayout from "@/layout/dashboardlayout";
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
