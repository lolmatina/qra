const nextConfig = {
  transpilePackages: ['react-quill'],
  exportTrailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
}; 