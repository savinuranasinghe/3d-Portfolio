/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Transpile packages that need client-side only execution
  transpilePackages: [
    'three',
    'three-globe',
    '@react-three/fiber', 
    '@react-three/drei',
    'react-lottie'
  ],
  
  // ✅ Webpack configuration for SSR safety
  webpack: (config, { isServer }) => {
    // Fix for Three.js and other client-side libraries
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }

    // ✅ Handle shader files if you have any
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    // ✅ Ignore certain modules during SSR
    if (isServer) {
      config.externals = [...(config.externals || []), 'three-globe'];
    }

    return config;
  },
  
  // ✅ Other optimizations
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  
  // ✅ Experimental features that might help
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;