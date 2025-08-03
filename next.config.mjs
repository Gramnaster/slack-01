/** @type {import('next').NextConfig} */

const nextConfig = {
  // experimental: {
  //   ppr: 'incremental'
  // }
  webpack: (config) => {
    // Enables polling for file changes every 1000ms (1 second)
    // Useful for environments where file system events are not reliable
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};
export default nextConfig;
