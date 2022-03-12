const withTM = require('next-transpile-modules')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM(['@me/utils'])(nextConfig)
