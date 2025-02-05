/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: "/api/:path*",
    //             destination: "http://174.138.22.1/api/:path*",
    //         },
    //     ];
    // },
};

export default nextConfig;
