import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body></body>', { url: 'https://example.org/' });

const keys = [
  'document',
  'DocumentFragment',
  'HTMLElement',
  'Node',
  'Event',
  'MouseEvent'
];
keys.forEach((key) => {
  global[key] = jsdom.window[key];
});
global.self = jsdom.window;
