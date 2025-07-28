/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    images: {
        unoptimized: true, // Disable default image optimization
    },
    assetPrefix: isProd ? '/food-blog/' : '',
    basePath: isProd ? '/food-blog' : '',
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
};

export default nextConfig;
