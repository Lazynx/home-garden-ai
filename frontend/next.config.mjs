/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'home-garden-bucket.s3.us-east-1.amazonaws.com',
        'homegardenai.s3.eu-central-1.amazonaws.com'
      ],
    },
  };
  
  export default nextConfig;
  