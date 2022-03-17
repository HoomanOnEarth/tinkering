/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    
    // import ts/tsx libs in workspace
    config.module.rules.push({
      test: /\.(ts)x?$/,
      use: 'next-swc-loader',
    })

    return config
  },
}

module.exports = nextConfig
