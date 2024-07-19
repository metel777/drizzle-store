/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  	serverComponentsExternalPackages: ["@node-rs/argon2"],
    outputFileTracingIncludes: {
      "/": ["./node_modules/argon2/prebuilds/linux-x64/*.musl.*"],
    },
  }
}

export default nextConfig
