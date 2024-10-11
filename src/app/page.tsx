"use client";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layout/applayout";
import Image from "next/image";
import {
  WavePattern,
  AlvinProfile,
  BombosProfile,
  ClementProfile,
} from "@/assets";
import { onboardingSteps, accountCreationSteps } from "@/resources/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <AppLayout>
      <div className="hero relative py-[120px] px-2 max-h-[800px] rounded-[40px] bg-bg-grad2 overflow-hidden">
        <div className="z-[9999999] grid gap-4 place-items-center text-center max-w-[605px] my-0 mx-auto">
          <h1 className="font-bricolage-grotesque font-extrabold text-6xl gradient-text">
            Your Web3 Profile, Everywhere
          </h1>
          <p className="z-50 font-plus-jakarta text-[#565F71] text-base font-medium max-w-[436px]">
            Create a decentralized profile that follows you across all your
            favorite dApps, platforms, and blockchain services, with full
            control over your identity.
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
                            className="z-50 text-white font-bold min-w-[204px] h-12 py-4 px-5 mt-6 rounded-xl hover:bg-current cursor-pointer bg-[linear-gradient(88deg,_#157BEB_0.65%,_#C790F3_105.42%)] font-plus-jakarta"
                          >
                            Get Started
                          </Button>
                        );
                      }

                      if (connected) {
                        return (
                          <Button className="z-50 text-white font-bold min-w-[204px] h-12 py-4 px-5 mt-6 rounded-xl hover:bg-current cursor-pointer bg-[linear-gradient(88deg,_#157BEB_0.65%,_#C790F3_105.42%)] font-plus-jakarta">
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

          <Image
            src={WavePattern}
            alt="wave_pattern"
            className="absolute inset-0 w-full h-full z-10"
          />
          <div className="relative w-96">
            <div className="absolute -left-20 bottom-0">
              <Image src={ClementProfile} alt="base_profile" />
            </div>
            <div>
              <Image
                src={BombosProfile}
                alt="base_profile"
                className="absolute left-20 bottom-0"
              />
            </div>
            <div className="z-50 relative">
              <Image src={AlvinProfile} alt="alvin_profile" className="z-50" />
            </div>
          </div>
        </div>
      </div>
      {/* Digital Wallet Section */}
      <div className="grid gap-4 place-items-center mt-24">
        <h1 className=" text-center font-bricolage-grotesque font-extrabold text-5xl max-w-[605px] text-[#1D2939]">
          Own Your Digital Identity Across Web3
        </h1>
        <p className="text-center font-plus-jakarta text-[#565F71] text-base font-medium max-w-[549px]">
          Easily connect your crypto wallet and create a complete Web3 profile.
          Your profile is yours to control—decentralized and completely yours.
        </p>
        <div className="mt-[64px] grid gap-4">
          <div className="flex gap-4">
            {onboardingSteps
              ?.slice(0, 3)
              .map(({ title, description, banner }, idx) => (
                <div
                  className="bg-[#F7F8FC] min-h-[306px] pl-8 pt-8 pr-8 rounded-[20px] w-full flex flex-col justify-between"
                  key={idx}
                >
                  <div className="flex flex-col">
                    <h2 className="text-[#1D2939] font-bricolage-grotesque font-extrabold text-[32px]">
                      {title}
                    </h2>
                    <p className="text-base text-[#565F71] font-medium font-plus-jakarta max-w-[354px]">
                      {description}
                    </p>
                  </div>
                  <Image
                    src={banner}
                    alt="banner"
                    className="flex flex-col items-end justify-end"
                  />
                </div>
              ))}
          </div>
          <div className="flex gap-4">
            {onboardingSteps
              ?.slice(3, 6)
              .map(({ title, description, banner }, idx) => (
                <div
                  className="bg-[#F7F8FC] min-h-[306px] pl-8 pt-8 pr-8 rounded-[20px] w-full flex flex-col justify-between"
                  key={idx}
                >
                  <div className="flex flex-col">
                    <h2 className="text-[#1D2939] font-bricolage-grotesque font-extrabold text-[32px]">
                      {title}
                    </h2>
                    <p className="text-base text-[#565F71] font-medium font-plus-jakarta w-full">
                      {description}
                    </p>
                  </div>
                  <Image
                    src={banner}
                    alt="banner"
                    className="flex flex-col items-end justify-end"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* How to Get Started Steps */}
      <div className="mt-24 grid gap-16">
        <h2 className="text-center font-bricolage-grotesque font-extrabold text-5xl text-[#1D2939]">
          How to get Started
        </h2>
        {accountCreationSteps.map(({ id, title, description, img }) => (
          <div className="flex justify-between items-center" key={id}>
            <div className="flex gap-4 w-full">
              <h3 className="font-bricolage-grotesque font-extrabold text-[32px] text-[#1D2939]">
                {id}.
              </h3>
              <div>
                <h3 className="font-bricolage-grotesque font-extrabold text-[32px] text-[#1D2939]">
                  {title}
                </h3>
                <p className="font-plus-jakarta text-[#565F71] text-base font-medium max-w-[409px]">
                  {description}
                </p>
              </div>
            </div>
            <div className="w-full grid place-items-center rounded-3xl pt-8 pl-8 pr-8 bg-[linear-gradient(156deg,_#C0DFFF_0.83%,_#FFF2FC_44.55%,_#DEDBFF_89.92%)]">
              <Image src={img} alt="steps" />
            </div>
          </div>
        ))}
      </div>
      {/* FAQ */}
      <div className="mt-24 grid gap-[40px]">
        <h2 className="text-center font-bricolage-grotesque font-extrabold text-5xl text-[#1D2939]">
          Frequently Asked Questions
        </h2>
        <div className="accordion md:min-w-[800px] my-0 mx-auto">
          <Accordion type="single" collapsible className="grid gap-3">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Onentry?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I connect my wallet?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I use an NFT as my avatar?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Where will my profile be visible?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </AppLayout>
  );
}
