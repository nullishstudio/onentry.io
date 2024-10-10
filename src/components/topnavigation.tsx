"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import { OnentryIoLogo } from "@/assets";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function TopNavigation() {
  const account = useAccount();
  console.log(account.address);
  return (
    <div className="flex items-center justify-between my-0 mx-auto md:max-w-[1440px] w-[90%] py-6 h-20">
      <div className="logo cursor-pointer">
        <Image src={OnentryIoLogo} alt="onentryio" />
      </div>
      <div className="connection_btn">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button
                        onClick={openConnectModal}
                        className="text-[#7880E9] bg-white border border-[#7880E9] shadow-none font-plus-jakarta font-medium text-[15px] leading-[18px] min-h-12 rounded-xl py-[18px] px-5 cursor-pointer hover:bg-[#7880E9] hover:text-white"
                      >
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    );
                  }
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
}
