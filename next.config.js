/**
 * @type {import('next').NextConfig}
 */

// read more about next.config.js below:
// https://nextjs.org/docs/api-reference/next.config.js/introduction

// see more about less: https://github.com/elado/next-with-less
const withLess = require('next-with-less')

const nextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withLess(nextConfig)
