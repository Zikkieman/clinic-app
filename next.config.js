/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"], // <-- and this
    serverActions: true,
  },
 images: {
  domains:['res.cloudinary.com']
 }
};

module.exports = nextConfig;
