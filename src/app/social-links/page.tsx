import { SampleUser } from "@/assets";
import Dashboardlayout from "@/layout/dashboardlayout";
import Image from "next/image";
import SocialLinksComponent from "./components/social-links";

const SocialLinks = () => {
  return (
    <Dashboardlayout
      title="Add Social Media"
      element={<SocialLinksComponent />}
    >
      <div className="p-6 my-0 mx-auto rounded-2xl">
        <div className="min-h-[300px] bg-white p-[56px] rounded-2xl grid gap-5">
          <Image
            src={SampleUser}
            alt="sample_user"
            className="rounded-[100px] w-32 h-32"
            width={128}
            height={128}
          />
          <div className="grid gap-1">
            <h1 className="text-2xl font-bricolage-grotesque font-bold">
              Michaela U.
            </h1>
            <span className="text-[13px] text-[#667085]">@echobyzinchenko</span>
          </div>
          <p className="text-sm font-plus-jakarta font-normal text-[#667085]">
            Lorem ipsum dolor sit amet consectetur. Nunc nibh commodo suscipit
            volutpat a cursus vulputate. Urna gravida at eu sed. Imperdiet sed
            venenatis pellentesque mauris penatibus diam turpis quis. Quis leo
            sapien sed sit nam morbi sit.
          </p>
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default SocialLinks;
