"use client";
import { CloseCircle } from "iconsax-react";
import { CircleCheckBig } from "lucide-react";
import { toast } from "sonner";

export const dispatchtoast = ({ text }: { text: string }) => {
  toast.custom(
    (t) => (
      <div className="flex items-center justify-between p-[10px] rounded-xl shadow-none min-w-72 h-[52px]">
        <div className="flex items-center gap-2">
          <div className="bg-[#4CCA6F] h-8 w-8 p-2 rounded-[8px]">
            <CircleCheckBig size={16} width={16} color="white" />
          </div>
          <p className="text-[#488359] font-plus-jakarta text-sm font-medium leading-[15.4px]">
            {text}
          </p>
        </div>
        <button onClick={() => toast.dismiss(t)}>
          <CloseCircle size="22" color="#ACCFB6" variant="TwoTone" />
        </button>
      </div>
    ),
    {
      className: "rounded-xl p-[10px] text-sm font-normal md:min-w-[350px]",
    }
  );
};
