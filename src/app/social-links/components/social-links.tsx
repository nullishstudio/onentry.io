"use client";
import { RiTwitterXFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { SiFarcaster } from "react-icons/si";
import { InfoCircle } from "iconsax-react";
import { Github, Link } from "lucide-react";
import { AiOutlineDiscord } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import TextInput from "@/components/input";
import Spinner from "@/components/spinner";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dispatchtoast } from "@/components/toast";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface SocialProps {
  data: {
    twitter: string;
    github: string;
    farcaster: string;
    telegram: string;
    discord: string;
    url: string;
  };
}

const SocialLinksComponent = ({ data }: SocialProps) => {
  const [social, setSocial] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const queryClient = useQueryClient();
  const socialLinks = [
    {
      name: "Farcaster",
      icon: <SiFarcaster width={22} size={22} color="#7880E9" />,
      connected: data?.farcaster,
      url: data?.farcaster,
    },
    {
      name: "Twitter",
      icon: <RiTwitterXFill width={22} size={22} color="#7880E9" />,
      connected: data?.twitter,
      url: data?.twitter,
    },
    {
      name: "GitHub",
      icon: <Github width={22} size={22} color="#7880E9" />,
      connected: data?.github,
      url: data?.github,
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane width={22} size={22} color="#7880E9" />,
      connected: data?.telegram,
      url: data?.telegram,
    },
    {
      name: "Discord",
      icon: <AiOutlineDiscord width={22} size={22} color="#7880E9" />,
      connected: data?.discord,
      url: data?.discord,
    },
    {
      name: "URL",
      icon: <Link width={22} size="22" color="#7880E9" />,
      connected: data?.url,
      url: data?.url,
    },
  ] as const;

  const handleSocialUpdate = async () => {
    const label = platform.toLowerCase();
    const res = await axiosInstance.patch(apiRoutes.USER, {
      [label]: value,
    });
    return res.data;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: () => handleSocialUpdate(),
    mutationKey: ["updatesocials"],
    onSuccess: () => {
      dispatchtoast({
        text: `${platform} social setup successfully`,
      });
      queryClient.refetchQueries({
        queryKey: ["fulluserforsocial"],
      });
      queryClient.refetchQueries({
        queryKey: ["fulluser"],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="mt-1 grid gap-3">
      <p className="text-sm font-normal font-plus-jakarta text-[#667085] max-w-[320px] leading-5">
        Connect your profiles and share your social presence. Add as many social
        links as you like to showcase all your platforms.
      </p>
      <div className="text-xs text-[#090a0b] flex gap-2 font-plus-jakarta">
        <div>
          <InfoCircle size="14" width={20} variant="Bold" color="green" />
        </div>
        Your social profile is automatically fetched using basename if connected
        during setup. Click on a button to setup or update!
      </div>
      <div className="bg-[#EAECF0] h-[1px] w-full my-5" />
      <div className="grid gap-3">
        {socialLinks.map(({ name, icon, connected, url }, idx) => (
          <div
            key={idx}
            className="flex w-full items-center justify-between bg-white py-4 px-5 min-h-[51px] rounded-xl"
          >
            <button
              key={idx}
              className="text-base font-plus-jakarta font-medium text-[#667085] flex items-center gap-2"
            >
              {icon}
              {name}
            </button>

            <Dialog>
              <DialogTrigger asChild>
                {connected ? (
                  <button
                    onClick={() => {
                      setSocial(url);
                      setPlatform(name);
                    }}
                    className={`border rounded-[6px] text-xs text-[#667085] cursor-pointer py-[6px] px-2 font-plus-jakarta border-[#EAECF0] bg-[linear-gradient(91deg,_#FCE4FF_2.91%,_#FFEBD7_99.03%)] hover:border-[#FCE4FF]`}
                  >
                    Connected
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSocial(url);
                      setPlatform(name);
                    }}
                    className="border rounded-[6px] text-xs text-[#667085] cursor-pointer py-[6px] px-2 font-plus-jakarta border-[#EAECF0] hover:bg-[linear-gradient(91deg,_#FCE4FF_2.91%,_#FFEBD7_99.03%)] hover:border-[#FCE4FF]"
                  >
                    Not Connected
                  </button>
                )}
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-plus-jakarta">
                    Complete or update profile{" "}
                  </DialogTitle>
                  <DialogDescription className="font-plus-jakarta">
                    Setup your {platform} profile.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-1">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <TextInput
                      id="link"
                      placeholder=""
                      onChange={(e) => setValue(e.target.value)}
                      defaultValue={url === social ? url : ""}
                    />
                    <div className="flex flex-col md:flex-row gap-2 items-center mt-4">
                      {!isPending && (
                        <button
                          onClick={() => mutate()}
                          className="text-white min-w-[120px] w-full min-h-14 py-[18px] px-5 rounded-xl bg-[#7880E9] hover:bg-[#7880E9] font-plus-jakarta text-sm font-medium"
                        >
                          Save
                        </button>
                      )}
                      {isPending && (
                        <Button
                          className="w-full bg-white hover:bg-white border-none shadow-none"
                          type="button"
                        >
                          <Spinner />
                        </Button>
                      )}
                      <DialogClose asChild>
                        <button className="border border-[#D9E2E7] rounded-xl text-[#212121] bg-white text-sm font-plus-jakarta font-medium w-full min-h-14 hover:bg-white">
                          Cancel
                        </button>
                      </DialogClose>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksComponent;
