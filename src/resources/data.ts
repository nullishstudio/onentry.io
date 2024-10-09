import {
  BuildProfile,
  ConnectWallet,
  CrossBanner,
  NFTBanner,
  PrivacyBanner,
  ProfileBanner,
  StorageBanner,
  UseEverywhere,
} from "@/assets";

export const onboardingSteps = [
  {
    title: "Complete Profile",
    description:
      "Create a decentralized profile with your bio, social links, and contact info across Web3.",
    banner: ProfileBanner,
  },
  {
    title: "Decentralized Storage",
    description:
      "Store your profile and avatar on IPFS for secure, permanent access.",
    banner: StorageBanner,
  },
  {
    title: "NFT Integration",
    description:
      "Set your favorite NFTs as avatars to showcase your digital identity.",
    banner: NFTBanner,
  },
  {
    title: "Cross-Platform Use",
    description:
      "Your profile works seamlessly across Web3 dApps and platforms.",
    banner: CrossBanner,
  },
  {
    title: "Total Privacy Control",
    description:
      "Decide where your profile appears, with full control over visibility.",
    banner: PrivacyBanner,
  },
] as const;

export const accountCreationSteps = [
  {
    id: 1,
    title: "Connect Your Wallet",
    description:
      "Log in with your crypto wallet to begin creating your decentralized profile.",
    img: ConnectWallet,
  },
  {
    id: 2,
    title: "Build Your Profile",
    description:
      "Upload your avatar or NFT, write your bio, and link your social media accounts or contact information.",
    img: BuildProfile,
  },
  {
    id: 3,
    title: "Use It Everywhere",
    description:
      "Your profile is automatically recognized on supported dApps and blockchain platforms, creating a unified presence across Web3.",
    img: UseEverywhere,
  },
] as const;
