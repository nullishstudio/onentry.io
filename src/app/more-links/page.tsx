import Dashboardlayout from "@/layout/dashboardlayout";
import MoreLinksComponent from "./components/more-links";
import ProfileBox from "@/components/profilebox";

const MoreLinks = () => {
  return (
    <Dashboardlayout title="More Links" element={<MoreLinksComponent />}>
      <ProfileBox />
    </Dashboardlayout>
  );
};

export default MoreLinks;
