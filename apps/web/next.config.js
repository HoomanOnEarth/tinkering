// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	reactStrictMode: true,
};

const withTM = require("next-transpile-modules")(["ui", "svg-tool"]);

module.exports = withTM(nextConfig);
