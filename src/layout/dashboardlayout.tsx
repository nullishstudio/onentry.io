"use client";
import DashboardTopnav from "@/components/dashboardtopnav";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboardsidebar";

interface DashboardlayoutProps {
  children: ReactNode;
  title: string;
  element?: ReactNode;
}

const Dashboardlayout = ({
  children,
  title,
  element,
}: DashboardlayoutProps) => {
  const pathname = usePathname();
  return (
    <div className="min-h-dvh w-full">
      <div className="toplayout">
        <DashboardTopnav />
      </div>
      <div className="flex">
        {pathname.includes("/dashboard") && (
          <div className="w-[392px] min-h-[879px] h-full">
            <Sidebar />
          </div>
        )}
        {!pathname.includes("/dashboard") && (
          <div className="w-[392px] min-h-[879px] h-full">
            <DashboardSidebar title={title}>{element}</DashboardSidebar>
          </div>
        )}
        <div className="md:ml-[392px] w-full bg-[linear-gradient(156deg,_#C0DFFF_0.83%,_#FFF2FC_44.55%,_#DEDBFF_89.92%)] p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
