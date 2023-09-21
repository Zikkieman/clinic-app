/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"], // <-- and this
  },
//  images: {
//   domains:['res.cloudinary.com']
//  }
};

module.exports = nextConfig;
