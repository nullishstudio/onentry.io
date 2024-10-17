import { JetIcon, OnentryIoLogo } from "@/assets";
import NextImage from "next/image";
import { Button } from "./ui/button";
import { Download, Link2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link1 } from "iconsax-react";
import QRCode from "react-qr-code";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { dispatchtoast } from "./toast";
import { useRef } from "react";

export default function DashboardTopnav() {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const fetchUserProfile = async () => {
    const res = await axiosInstance.get(apiRoutes.USER);
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["fulluser"],
    queryFn: () => fetchUserProfile(),
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleCopyLink = () => {
    if (data?.username) {
      const profileUrl = `https://onentryio-production.up.railway.app/${data.username}`;
      navigator.clipboard.writeText(profileUrl);
      dispatchtoast({
        text: "Link copied to clipboard!",
      });
    }
  };

  const handleDownloadQRCode = () => {
    if (qrCodeRef.current) {
      const svg = qrCodeRef.current.querySelector("svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL("image/png");

          const downloadLink = document.createElement("a");
          downloadLink.href = pngFile;
          downloadLink.download = "qrcode.png";
          downloadLink.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
      }
    }
  };

  return (
    <div className="flex justify-between items-center border-b-[1.5px] border-[#EAECF0] max-w-[1440px] w-full py-5 px-6">
      <NextImage src={OnentryIoLogo} alt="logo" className="cursor-pointer" />
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
                <NextImage src={JetIcon} alt="jet" />
              </div>
            </div>
            <h2 className="font-bricolage-grotesque text-[#1D2939] text-xl font-bold">
              Share Public Profile
            </h2>
            <p className="text-center text-sm text-[#667085] font-plus-jakarta">
              Copy your personal URL or share the QR code below
            </p>
            <div className="grid place-items-center" ref={qrCodeRef}>
              <QRCode
                size={256}
                className="w-[196px] h-[196px] my-8"
                //style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`https://onentryio-production.up.railway.app/${data?.username}`}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="grid gap-4">
              <Button
                className="flex items-center gap-2 border border-[#7880E9] bg-white hover:bg-white rounded-xl text-base font-plus-jakarta text-[#7880E9] min-h-14"
                onClick={handleCopyLink}
              >
                Copy Link <Link1 size="24" />
              </Button>
              <Button
                className="flex items-center gap-2 border border-[#EAECF0] bg-white hover:bg-white rounded-xl text-base font-plus-jakarta text-[#667085] min-h-14"
                onClick={handleDownloadQRCode}
              >
                Dowload QR Code <Download size="24" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
