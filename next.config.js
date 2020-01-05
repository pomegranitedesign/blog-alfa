//const withOffline = require('next-offline')
const withManifest = require('next-manifest')

const defaults = {
  output: './static/',
  name: 'Blog FarmTogether',
  short_name: 'Blog FarmTogether',
  background_color: '#ffffff',
  theme_color: '#ffffff',
  icons: [
    {
      'src': '/icons/icon-192x192.png',
      'sizes': '192x192',
      'type': 'image/png'
    },
    {
      'src': '/icons/icon-512x512.png',
      'sizes': '512x512',
      'type': 'image/png'
    }
  ]
}
const isProd = process.env.NODE_ENV === 'production' && process.env.STAGING !== '1'
let envPath = isProd ? '.env.production' : '.env.development'
const dotEnvResult = require('dotenv').config({ path: envPath })
if (dotEnvResult.error) {
  throw dotEnvResult.error
}

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    BLOG_API_URL: process.env.BLOG_API_URL,
    STAGING: process.env.STAGING
  },
  experimental: {
    terserLoader: isProd === true
  },
  manifest: {
    ...defaults
  },
  poweredByHeader: false,
  webpack: (config, { defaultLoaders, isServer }) => {
    const assetPrefix = ''
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: 'file-loader',
          publicPath: `${assetPrefix}/_next/static/images/`,
          outputPath: `${isServer ? '../' : ''}static/images/`,
          name: '[name].[hash:8].[ext]'
        }
      }
    })
    config.module.rules.push({
      test: /\.(css|scss)$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'scoped'
          }
        }
      ]
    })

    return config
  }
}

module.exports = withManifest(nextConfig)
