import Dashboardlayout from "@/layout/dashboardlayout";
import AddLinksComponent from "../components/add-links";
import ProfileBox from "@/components/profilebox";

const AddLinks = () => {
  return (
    <Dashboardlayout title="Add Links" element={<AddLinksComponent />}>
      <ProfileBox />
    </Dashboardlayout>
  );
};

export default AddLinks;
