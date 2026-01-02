/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Force fresh builds
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
}

module.exports = nextConfig
