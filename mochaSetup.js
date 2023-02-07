// eslint-disable-next-line import/no-extraneous-dependencies
const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');

const { window } = new JSDOM('<!DOCTYPE html><html lang="en"><div id="root"></div></body></html>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.FormData = window.FormData;

require.extensions['.hbs'] = (module, filename) => {
  const contents = fs.readFileSync(filename, 'utf-8');

  // eslint-disable-next-line no-param-reassign
  module.exports = Handlebars.compile(contents);
};

require.extensions['.scss'] = () => {
  module.exports = () => ({});
};
