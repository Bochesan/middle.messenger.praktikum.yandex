import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<main id="app"></main>', { url: 'https://example.org/' });

const keys = [
  'document',
  'DocumentFragment',
  'window',
  'HTMLElement',
  'Node',
  'Event',
  'MouseEvent'
];
keys.forEach((key) => {
  global[key] = jsdom.window[key];
});
global.self = jsdom.window;
