module.exports = {
  ci: {
    collect: {
      // collect options here
      "url": [
        "http://localhost/index.html",
        "http://localhost/documentation/",
      ],
      staticDistDir: './_site',
      staticDirFileDiscoveryDepth: 1,
      "numberOfRuns": 1,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
    // assert options here
    preset: 'lighthouse:no-pwa',
    // "preset": "lighthouse:recommended",
    // https://stackoverflow.com/questions/65550806/how-can-i-set-lighthouse-ci-to-only-test-accessibility
      "assertions": {
        'first-contentful-paint': ["warn", {"maxNumericValue": 4000}],
        'categories:performance': ['warn', { minScore: 1 }], // not valid ?
        'categories:accessibility': ['warn', { minScore: 1 }],
        'categories:best-practices': ['warn', { minScore: 1 }],
        'categories:seo': ['warn', { minScore: 1 }],
        "categories:pwa": ["warn", { minScore: 1 }],
        "render-blocking-resources": "off",
        "color-contrast": ['warn', { minScore: 0.9 }],
        "errors-in-console": "warn",
      }
    },
    // server: {
    //   // server options here
    // },
    // wizard: {
    //   // wizard options here
    // },
  },
};