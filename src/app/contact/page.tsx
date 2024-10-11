import Dashboardlayout from "@/layout/dashboardlayout";
import ProfileBox from "@/components/profilebox";
import ContactLinksComponent from "./components/contact-links";

const Contact = () => {
  return (
    <Dashboardlayout title="Contact" element={<ContactLinksComponent />}>
      <ProfileBox />
    </Dashboardlayout>
  );
};

export default Contact;
