"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { axiosInstance, uploadImage } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/spinner";
import { toast } from "sonner";

const AvatarForm = () => {
  const [uploading, setUploading] = useState(false);
  const [avatarId, setAvatarId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

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
      toast.success(res.message);
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
      toast.success("PFP saved and would be used across all apps");
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

        <Button
          variant={undefined}
          className="text-[#7880E9] h-12 border border-[#7880E9] text-base font-semibold font-plus-jakarta py-3 px-5 min-h-12 rounded-xl bg-white shadow-none hover:bg-white"
        >
          Choose From NFTs
        </Button>
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
