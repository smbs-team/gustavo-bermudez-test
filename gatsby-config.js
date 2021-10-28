module.exports = {
  siteMetadata: {
    title: "Marvel Site",
    description: "Show characters, stories and comics from Marvel Universe",
    author: "gb",
    siteUrl: "https://marvelgbtest.gatsbyjs.io",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-fontawesome-css",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Marvel Comics`,
        short_name: `Comics`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#333`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    "gatsby-plugin-use-query-params",
    "gatsby-plugin-remove-serviceworker"
  ],
};
