"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { axiosInstance, uploadImage } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Moralis from "moralis";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/components/loader";
import Spinner from "@/components/spinner";
import { EmptyState } from "@/assets";
import { dispatchtoast } from "@/components/toast";
import { useAccount } from "wagmi";

const AvatarForm = () => {
  const [uploading, setUploading] = useState(false);
  const [avatarId, setAvatarId] = useState<string>("");
  const [nftUrl, setNftUrl] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const fetchUserAvatars = async () => {
    const res = await axiosInstance.get(apiRoutes.GET_ALL_AVATARS);
    return res.data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["avatars"],
    queryFn: fetchUserAvatars,
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadImage(file, apiRoutes.UPLOAD_AVATAR),
    onSuccess: (res) => {
      dispatchtoast({
        text: res.message,
      });
      refetch();
    },
    onError: () => {
      toast.error("Avatar upload failed!");
    },
    onSettled: () => {
      setUploading(false);
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      uploadMutation.mutate(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarSelection = (id: string) => {
    setAvatarId(id);
  };

  const saveMutation = useMutation({
    mutationFn: () => axiosInstance.patch(apiRoutes.SAVE_AVATAR, { avatarId }),
    onSuccess: () => {
      dispatchtoast({
        text: "PFP saved and would be used across all apps",
      });
      queryClient.refetchQueries({ queryKey: ["fulluser"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSave = () => {
    if (avatarId) {
      saveMutation.mutate();
    } else {
      toast.error("Please select an avatar first");
    }
  };

  const saveAndUploadNFTPicture = async () => {
    const res = await axiosInstance.patch(apiRoutes.USER, {
      avatarUrl: nftUrl,
    });
    return res.data;
  };

  const saveSelectedNft = useMutation({
    mutationFn: () => saveAndUploadNFTPicture(),
    mutationKey: ["savenfts"],
    onSuccess: async () => {
      dispatchtoast({
        text: "Nft uploaded as avatar successfully",
      });
      queryClient.refetchQueries({ queryKey: ["fulluser"] });
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong, please try again");
    },
  });

  const handleSaveNft = () => {
    if (nftUrl) {
      saveSelectedNft.mutateAsync();
    } else {
      toast.error("Please select an nft first");
    }
  };

  const fetchUserNfts = async (address: string) => {
    try {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API,
      });

      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: "0x2105", //base network
        format: "decimal",
        mediaItems: true,
        excludeSpam: true,
        address: address,
      });

      return response.raw;
    } catch (e) {
      console.error(e);
    }
  };

  const { data: nftfromwallet, isLoading: nftloading } = useQuery({
    queryKey: ["fetchnftsfrombase"],
    queryFn: () => fetchUserNfts(address!),
    enabled: !!address,
    refetchOnMount: true,
    retry: true,
  });

  return (
    <div className="mt-1 grid gap-3">
      <p className="text-sm font-normal font-plus-jakarta text-[#667085] max-w-[320px] leading-5">
        Express yourself with custom avatars! Add as many as you like, and
        switch your display avatar anytime.
      </p>
      <div className="bg-[#EAECF0] h-[1px] w-full my-5" />
      {isLoading && (
        <div className="grid place-items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-3 gap-3">
          {data?.length > 0 &&
            data?.map(
              ({ avatarUrl, id }: { avatarUrl: string; id: string }) => (
                <Image
                  src={avatarUrl}
                  key={id}
                  alt="avatar"
                  className={`${
                    id === avatarId && "border-2 border-[#7880E9]"
                  } cursor-pointer min-w-[100px] w-full h-[100px] rounded-[8px] hover:border-2 hover:border-[#7880E9] shadow-[#7880E9]`}
                  width={100}
                  height={100}
                  onClick={() => handleAvatarSelection(id)}
                />
              )
            )}
          <div className="grid place-items-center">
            {uploading && <Spinner />}
          </div>
        </div>
      )}
      <span className="text-xs font-plus-jakarta text-[#565F71]">
        Select and click on save to apply PFP
      </span>
      <div className="grid gap-3 mt-5">
        <div className="relative">
          <input
            type="file"
            id="avatar-upload"
            onChange={handleFileChange}
            accept="image/*"
            className="sr-only"
            ref={fileInputRef}
          />
          <Button
            onClick={handleButtonClick}
            className="text-[#7880E9] text-base font-semibold font-plus-jakarta py-3 px-5 min-h-12 rounded-xl bg-white shadow-none hover:bg-white hover:shadow-sm transition-shadow flex items-center gap-2 w-full"
            disabled={uploading}
          >
            <Plus className="w-5 h-5" />
            {uploading ? "Uploading..." : "Upload Avatar"}
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="w-full">
            <Button
              variant={undefined}
              className="text-[#7880E9] w-full h-12 border border-[#7880E9] text-base font-semibold font-plus-jakarta py-3 px-5 min-h-12 rounded-xl bg-white shadow-none hover:bg-white"
            >
              Choose From NFTs
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[576px] h-auto">
            <DialogHeader>
              <DialogTitle>
                <h1 className="font-bricolage-grotesque font-bold text-[28px] text-[#1D2939]">
                  Your NFTs
                </h1>
              </DialogTitle>
            </DialogHeader>
            {nftloading && (
              <div className="spinner absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="grid text-center place-items-center gap-2">
                  <Loader />
                  <p className="font-plus-jakarta text-[#7e7f83] font-medium text-base text-center">
                    Fetching NFTs...
                  </p>
                </div>
              </div>
            )}
            <div className="mt-4">
              <div
                className={`${nftloading && "grid grid-cols-3 gap-4"} ${
                  nftfromwallet?.result.length === 0 &&
                  "grid place-items-center"
                } ${
                  nftfromwallet?.result.length !== 0 && "grid grid-cols-3 gap-4"
                }
                place-items-center`}
              >
                <>
                  {nftloading &&
                    Array(9)
                      .fill({})
                      .map((itm, idx: number) => (
                        <Skeleton
                          key={idx}
                          className="rounded-xl h-36 w-full cursor-pointer"
                        />
                      ))}
                </>
                <>
                  {!nftloading && (
                    <>
                      {nftfromwallet?.result.length !== 0 &&
                        nftfromwallet?.result
                          .slice(0, 9)
                          .map((itm, idx) => (
                            <Image
                              src={
                                (itm.media && itm.media.original_media_url) ||
                                ""
                              }
                              alt={itm.name}
                              key={idx}
                              width={100}
                              height={144}
                              className={`${
                                nftUrl === itm?.media?.original_media_url
                                  ? "border-[2.2px] border-[#7880e9]"
                                  : ""
                              } w-full h-36 cursor-pointer rounded-[8px] hover:border-2 hover:border-[#7880E9] shadow-[#7880E9]`}
                              onClick={() =>
                                setNftUrl(itm?.media?.original_media_url)
                              }
                            />
                          ))}

                      {/* No NFT */}
                      <>
                        {nftfromwallet?.result.length === 0 && (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Image src={EmptyState} alt="empty_state" />
                            <p className="font-plus-jakarta text-base font-medium text-[#667085]">
                              You don’t have any NFTs
                            </p>
                          </div>
                        )}
                      </>
                    </>
                  )}
                </>
              </div>
            </div>
            <DialogFooter className="my-4 flex items-center">
              <DialogClose asChild>
                <Button className="border border-[#D9E2E7] rounded-xl text-[#212121] bg-white text-sm font-plus-jakarta font-medium w-full min-h-14 hover:bg-white">
                  Cancel
                </Button>
              </DialogClose>
              {saveSelectedNft.isPending && (
                <Button
                  className="w-full bg-white hover:bg-white border-none shadow-none"
                  type="button"
                >
                  <Spinner />
                </Button>
              )}
              {nftfromwallet?.result && nftfromwallet?.result.length > 0 && (
                <>
                  {!saveSelectedNft.isPending && (
                    <Button
                      className="text-sm font-medium font-plus-jakarta bg-[#7880E9] hover:bg-[#7880E9] min-w-[120px] w-full min-h-14 py-[18px] px-5 rounded-xl"
                      onClick={handleSaveNft}
                    >
                      Choose & Set Avatar
                    </Button>
                  )}
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col self-end justify-end">
        {!saveMutation.isPending && (
          <button
            onClick={handleSave}
            className="text-white min-w-[120px] w-full min-h-14 py-[18px] px-5 rounded-xl bg-[#7880E9] hover:bg-[#7880E9] font-plus-jakarta text-base font-bold"
          >
            Save
          </button>
        )}

        {saveMutation.isPending && <Spinner />}
      </div>
    </div>
  );
};

export default AvatarForm;
