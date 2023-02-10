//!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

import withPWA from "next-pwa";

const configure = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default configure(config);