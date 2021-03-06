/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: 'micromatch', target: '3.1.10'},
    {name: 'jsrsasign', target: '8.0.12'}
  ],

  addons: [
    {name: '@onehilltech/ember-cli-storage', target: '0.2.1'},
    {name: 'ember-cli-mdc-form'},
    {name: 'ember-cli-mdc-textfield'},
    {name: 'ember-cli-mdc-button'},
    {name: 'ember-cli-mdc-snackbar'},
    {name: 'ember-cli-mdc-textfield'},
    {name: 'ember-copy'},
    {name: 'ember-cli-google-recaptcha', target: '2.0.1'},
    {name: 'ember-api-actions', target: '0.1.9'}
  ]
});
