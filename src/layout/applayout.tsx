import Footer from "@/components/footer";
import TopNavigation from "@/components/topnavigation";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white">
      <TopNavigation />
      <div className="my-0 mx-auto md:max-w-[1440px] w-[90%]">{children}</div>
      <Footer />
    </div>
  );
}
