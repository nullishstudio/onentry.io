import { Button } from "./ui/button";

export default function Footer() {
  return (
    <div className=" mx-auto md:max-w-[1440px] w-[90%] my-24 bg-[#131425] rounded-[40px] py-16 px-20">
      <div className="grid gap-4 place-items-center text-center max-w-[605px] my-0 mx-auto">
        <h1 className="font-bricolage-grotesque font-extrabold text-6xl footer_gradient_text">
          Build Your Web3 Identity Now
        </h1>
        <p className=" font-plus-jakarta footer_desc_gradient text-base font-medium max-w-[500px]">
          Connect your wallet and take control of your digital identity.
        </p>
        <Button className="font-medium min-w-[148px] h-12 py-4 px-5 mt-6 rounded-xl hover:bg-white cursor-pointer bg-white text-[#1A7BEB] font-plus-jakarta">
          Connect Wallet
        </Button>
        <div className="my-4">
          <p className="text-[#F3F3F3CC] font-plus-jakarta">
            All rights reserved {new Date().getFullYear()} Onentry by Base
          </p>
        </div>
      </div>
    </div>
  );
}
