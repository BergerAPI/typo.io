module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: 'https://typo-io.vercel.app/api/:path*',
      }
    ]
  }
};