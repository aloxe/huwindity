const fs = require("fs");
const htmlmin = require("html-minifier-terser");

module.exports = function(eleventyConfig) {

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/assets": "." });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/public': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/img': '/img' });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/fonts': '/fonts' });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/css': '/css' })
  
  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");

  return {
    dir: {
      input: "src/pages",
      output: '_site',
      layouts: '../_layouts',
      includes: '../_layouts',
    },
    templateFormats: ['md', 'njk', 'jpg', 'gif', 'png', 'html'],
    markdownTemplateEngine: 'njk',
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
