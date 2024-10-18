import { Button } from "./ui/button";
import Image from "next/image";
import { WaveFooterPattern } from "@/assets";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Footer() {
  return (
    <div
      className="mx-auto md:max-w-[1440px] w-[90%] my-24 bg-[#131425] rounded-[40px] py-16 px-20 relative"
      style={{}}
    >
      <Image
        src={WaveFooterPattern}
        alt="Wave footer pattern"
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      <div className="grid gap-4 place-items-center text-center max-w-[605px] my-0 mx-auto">
        <h1 className="font-bricolage-grotesque font-extrabold md:text-6xl text-2xl footer_gradient_text">
          Build Your Web3 Identity Now
        </h1>
        <p className=" font-plus-jakarta footer_desc_gradient text-base font-medium max-w-[500px]">
          Connect your wallet and take control of your digital identity.
        </p>
        <div className="z-50">
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
                          className="z-50 font-medium min-w-[148px] h-12 py-4 px-5 mt-6 rounded-xl hover:bg-white cursor-pointer bg-white text-[#7880E9] font-plus-jakarta"
                        >
                          Connect Wallet
                        </Button>
                      );
                    }

                    if (connected) {
                      return (
                        <Button className="z-50 font-medium min-w-[148px] h-12 py-4 px-5 mt-6 rounded-xl hover:bg-white cursor-pointer bg-white text-[#7880E9] font-plus-jakarta">
                          Connected
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

        <div className="my-4">
          <p className="text-[#F3F3F3CC] font-plus-jakarta">
            All rights reserved &copy; {new Date().getFullYear()} Onentry by
            Base
          </p>
        </div>
      </div>
    </div>
  );
}
