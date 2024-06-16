module.exports = {
    compiler: {
        reactStrictMode: true,
        styledComponents: true,
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/dashboard',
            permanent: true,
          },
        ]
      },
}
