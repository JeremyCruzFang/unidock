// Generates assets/js/dormSupplies.js from the handoff JSON
const fs = require('fs');
const path = require('path');

const SRC = 'E:/unidock_resources/dorm-supplies-handoff/dorm-supplies-handoff/data/dorm-products.json';
const OUT = path.join(__dirname, '..', 'assets', 'js', 'dormSupplies.js');

const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const sectionOrder = ['bedding-set', 'bed-curtain', 'single-items'];

const products = raw.map(p => {
  const images = p.images.map((img, i) => {
    const num = String(i + 1).padStart(2, '0');
    return './assets/img/dorm-supplies/' + p.sectionKey + '/' + p.productKey + '/' + num + '.webp';
  });
  // Cover thumbnail used by the grid cards. Full WebPs are reserved for the
  // lightbox so the initial paint only fetches ~85 tiny images instead of 767.
  const coverThumb = './assets/img/dorm-supplies-thumbs/' + p.sectionKey + '/' + p.productKey + '/cover.webp';
  return {
    sectionKey: p.sectionKey,
    productKey: p.productKey,
    productName: p.productName,
    displayName: p.productKey,
    status: p.status,
    coverThumb,
    images,
  };
});

// group
const grouped = {};
sectionOrder.forEach(k => { grouped[k] = []; });
products.forEach(p => {
  if (!grouped[p.sectionKey]) grouped[p.sectionKey] = [];
  grouped[p.sectionKey].push(p);
});

const out = `/* UniDock - Dorm Supplies data (auto-generated from handoff JSON)
   Source: dorm-supplies-handoff/data/dorm-products.json
   Section keys: bedding-set, bed-curtain, single-items
   Full images:  ./assets/img/dorm-supplies/<sectionKey>/<productKey>/<NN>.webp
   Cover thumbs: ./assets/img/dorm-supplies-thumbs/<sectionKey>/<productKey>/cover.webp */
(function () {
  const SECTION_ORDER = ${JSON.stringify(sectionOrder)};
  const PRODUCTS = ${JSON.stringify(products, null, 2)};

  function bySection(key) {
    return PRODUCTS.filter(function (p) { return p.sectionKey === key; });
  }

  window.UniDockDormSupplies = {
    sectionOrder: SECTION_ORDER,
    products: PRODUCTS,
    bySection: bySection,
  };
})();
`;

fs.writeFileSync(OUT, out, 'utf8');
console.log('Wrote', OUT, '(' + products.length + ' products)');
