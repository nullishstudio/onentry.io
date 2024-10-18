"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import { OnentryIoLogo } from "@/assets";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDisconnect } from "wagmi";

export default function TopNavigation() {
  const [show, setShow] = useState<boolean>(false);
  const { address, isConnected, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const token =
    typeof window !== "undefined" && localStorage.getItem("onentry_token");
  useEffect(() => {
    if (isConnected) {
      if (token) {
        setShow(true);
      }
    }

    if (isDisconnected) {
      setShow(false);
    }
  }, [address, isConnected, token, isDisconnected]);

  const handleLogout = () => {
    disconnect();
    localStorage.removeItem("onentry_token");
  };

  return (
    <div className="flex items-center justify-between my-0 mx-auto md:max-w-[1440px] w-[90%] py-6 h-20">
      <div className="logo cursor-pointer">
        <Image src={OnentryIoLogo} alt="onentryio" />
      </div>
      <div className="connection_btn flex gap-3 items-center">
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

                  return (
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center" }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                            className="text-sm font-plus-jakarta"
                          >
                            {chain.iconUrl && (
                              <Image
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                width={12}
                                height={12}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        <span className="text-sm font-plus-jakarta">
                          {chain.name}
                        </span>
                      </button>

                      <button
                        //onClick={openAccountModal}
                        type="button"
                        className="rounded-[14px] md:block hidden p-2 bg-[linear-gradient(91deg,_#FCE4FF_2.91%,_#FFEBD7_99.03%)] text-sm font-plus-jakarta"
                      >
                        {`${account.address.slice(
                          0,
                          6
                        )}...${account.address.slice(7, 14)}`}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
        {show && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <button
                  className="w-6 h-6 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #3665FF 0%, #4A1882 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #3665FF 0%, #4A1882 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #3665FF 0%, #4A1882 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #3665FF 0%, #4A1882 50%) top right / 50% 50% no-repeat",
                  }}
                ></button>
                <p className="text-base font-plus-jakarta font-medium">Menu</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/dashboard">
                  <DropdownMenuItem className="font-bricolage-grotesque cursor-pointer text-base font-normal">
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="font-bricolage-grotesque cursor-pointer text-base font-normal text-red-500 hover:text-red-500"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
