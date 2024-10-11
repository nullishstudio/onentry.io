import { JetIcon, OnentryIoLogo } from "@/assets";
import Image from "next/image";
import { Button } from "./ui/button";
import { Link2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link1 } from "iconsax-react";
import QRCode from "react-qr-code";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";

export default function DashboardTopnav() {
  const fetchUserProfile = async () => {
    const res = await axiosInstance.get(apiRoutes.USER);
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["basicprofile"],
    queryFn: () => fetchUserProfile(),
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex justify-between items-center border-b-[1.5px] border-[#EAECF0] max-w-[1440px] w-full py-5 px-6">
      <Image src={OnentryIoLogo} alt="logo" className="cursor-pointer" />
      <Dialog>
        <DialogTrigger>
          <Button
            variant="outline"
            className="border-[#EAECF0] py-[10px] px-4 min-h-9 rounded-[100px] bg-none text-[#667085] text-sm font-medium font-plus-jakarta min-w-[143px] flex items-center gap-2 hover:bg-white"
          >
            Share profile <Link2 size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[420px]">
          <div className="mt-6 text-center grid gap-4">
            <div className="absolute left-[40%] -top-14">
              <div className="mx-auto grid place-items-center bg-[#FAFAFA] rounded-full w-24 h-24">
                <Image src={JetIcon} alt="jet" />
              </div>
            </div>
            <h2 className="font-bricolage-grotesque text-[#1D2939] text-xl font-bold">
              Share Public Profile
            </h2>
            <p className="text-center text-sm text-[#667085] font-plus-jakarta">
              Copy your personal URL or share the QR code below
            </p>
            <div className="grid place-items-center">
              <QRCode
                size={256}
                className="w-[196px] h-[196px] my-8"
                //style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`https://onentry.xyz/${data?.username}`}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="grid gap-4">
              <Button className="flex items-center gap-2 border border-[#7880E9] bg-white hover:bg-white rounded-xl text-base font-plus-jakarta text-[#7880E9] min-h-14">
                Copy Link <Link1 size="24" />
              </Button>
              <Button className="flex items-center gap-2 border border-[#EAECF0] bg-white hover:bg-white rounded-xl text-base font-plus-jakarta text-[#667085] min-h-14">
                Dowload QR Code <Link1 size="24" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
