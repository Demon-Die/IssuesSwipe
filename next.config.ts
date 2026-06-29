import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['firebase-admin', 'jwks-rsa', 'jose', 'pg'],
  allowedDevOrigins: ['192.168.1.8', '10.153.76.134'],
};

export default nextConfig;
