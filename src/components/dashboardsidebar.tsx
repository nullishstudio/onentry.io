"use client";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface DashboardSidebarProps {
  children: ReactNode | JSX.Element;
  title: string;
}
const DashboardSidebar = ({ children, title }: DashboardSidebarProps) => {
  return (
    <div className="w-[398px] min-h-dvh h-auto">
      <div className="min-h-dvh h-auto bg-white rounded-2xl py-5 px-4">
        <h2 className="text-base font-plus-jakarta font-semibold bg-[#F9FAFB] flex items-center rounded-2xl p-4 w-full min-h-11">
          <ChevronLeft cursor="pointer" onClick={() => window.history.back()} />{" "}
          <h2 className="my-0 mx-auto">{title}</h2>
        </h2>
        <div className="flex flex-col gap-4 mt-4 bg-[#F9FAFB] p-4 rounded-2xl min-h-dvh h-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
