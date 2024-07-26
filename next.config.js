const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com', 'firebasestorage.googleapis.com'],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

module.exports = withVanillaExtract(nextConfig);
