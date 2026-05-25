/** @type {import('next').NextConfig} */
const nextConfig = {
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 500,
        ignored: ["**/node_modules/**", "**/.next/**"],
      };
    }

    // jsonwebtoken sirf server pe run hoga
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        jws: false,
        semver: false,
        ms: false,
        "lodash.includes": false,
        "lodash.isboolean": false,
        "lodash.isinteger": false,
        "lodash.isnumber": false,
        "lodash.isplainobject": false,
        "lodash.isstring": false,
        "lodash.once": false,
      }
    }

    return config;
  },
};

export default nextConfig;