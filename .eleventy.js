const fs = require("fs");
const htmlmin = require("html-minifier-terser");
const tailwind = require('tailwindcss');
const postCss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mdit = require('markdown-it')
const mditAttrs = require('markdown-it-attrs');
const mditHighlight = require('markdown-it-highlightjs');
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  // markdown 
  const mditOptions = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }
  const mdLib = mdit(mditOptions).use(mditAttrs).use(mditHighlight, { inline: true }).disable('code')
  eleventyConfig.setLibrary('md', mdLib)

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/assets": "." });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/public': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/img': '/img' });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/fonts': '/fonts' });
  
  // Watch targets
  eleventyConfig.addWatchTarget("./src/_assets/css/");

  // process css
  eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter);

  return {
    dir: {
      input: "src/pages",
      layouts: '../_layouts',
      includes: '../_layouts/includes',
      data: '../_data',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'jpg', 'gif', 'png', 'html'],
    pathPrefix: process.env.BASE_HREF ? `/${process.env.BASE_HREF}/` : "/" //  used with github pages
  }
};

function htmlminTransform(content, outputPath) {
  if( outputPath.endsWith(".html") ) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
    return minified;
  }
  return content;
}

// inspired by https://zenzes.me/eleventy-integrate-postcss-and-tailwind-css/
const postcssFilter = (cssCode, done) => {
  postCss([
    require('postcss-import'),
    tailwind(require('./tailwind.config')),
    autoprefixer(),
    // TODO use purgecss for each layout
    // cssnano({ preset: 'default' })
  ])
    .process(cssCode, {
      // path to our CSS file
      from: './src/_assets/css/styles.css'
    })
    .then(
      (r) => done(null, r.css),
      (e) => done(e, null)
    );
}
