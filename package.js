Package.describe({
  name: 'nodexpert:react-custom-form',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Package to create react form by using json data',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/nodexpertsdev/react-custom-form',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "react": '15.3.0'
})

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.mainModule('index.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('nodexpert:react-custom-form');
  api.mainModule('tests.js');
});
