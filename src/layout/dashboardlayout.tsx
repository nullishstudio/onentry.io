"use client";
import DashboardTopnav from "@/components/dashboardtopnav";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboardsidebar";
import Mobilenav from "@/components/mobilenav";
import FloatingSheetButton from "@/components/floating-sheet";

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
          <>
            <div className="w-[392px] min-h-[879px] h-full hidden md:block">
              <Sidebar />
            </div>
          </>
        )}
        {!pathname.includes("/dashboard") && (
          <div className="w-[392px] min-h-[879px] h-full hidden md:block">
            <DashboardSidebar title={title}>{element}</DashboardSidebar>
          </div>
        )}

        <div className="md:ml-[392px] w-full bg-[linear-gradient(156deg,_#C0DFFF_0.83%,_#FFF2FC_44.55%,_#DEDBFF_89.92%)] p-6">
          <div className="md:hidden block my-3">
            <Mobilenav />
          </div>
          {!pathname.includes("/dashboard") && (
            <div className="md:hidden block my-3">
              <FloatingSheetButton>{element}</FloatingSheetButton>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
