/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "encoding");
    return config;
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "ipfs.io",
      "i.seadn.io",
      "nft-preview-media.s3.us-east-1.amazonaws.com",
      "base.org",
    ],
  },
};

export default nextConfig;
