module.exports = {
  ci: {
    collect: {
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
    preset: 'lighthouse:no-pwa',
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
  },
};