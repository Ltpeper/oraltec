// Shared data + tokens for Oraltec dashboard directions
// Brand: Oraltec — UV-C pod 'Oraltec One' for orthodontists
// Product: één hoofdproduct + custom-branding aanvraag

const ORALTEC_ORDERS = [
  { id: 'OT-2948', date: '18 Apr 2026', units: 24, model: 'Oraltec One',         variant: 'Standaard',   status: 'Onderweg', total: '€1.896,00', eta: '22 Apr' },
  { id: 'OT-2931', date: '02 Apr 2026', units: 12, model: 'Oraltec One',         variant: 'Standaard',   status: 'Geleverd', total: '€948,00',   eta: '—' },
  { id: 'OT-2902', date: '14 Mar 2026', units: 50, model: 'Oraltec One — Custom', variant: 'Eigen branding', status: 'Geleverd', total: '€4.450,00', eta: '—' },
  { id: 'OT-2874', date: '22 Feb 2026', units: 12, model: 'Oraltec One',         variant: 'Standaard',   status: 'Geleverd', total: '€948,00',   eta: '—' },
  { id: 'OT-2831', date: '05 Feb 2026', units: 24, model: 'Oraltec One',         variant: 'Standaard',   status: 'Geleverd', total: '€1.896,00', eta: '—' },
  { id: 'OT-2790', date: '19 Jan 2026', units: 6,  model: 'Oraltec One',         variant: 'Standaard',   status: 'Geleverd', total: '€474,00',   eta: '—' },
];

// Alleen één echt product + de custom-variant als service
const ORALTEC_PRODUCT = {
  sku: 'ONE',
  name: 'Oraltec One',
  tagline: 'UV-C sterilisatie-pod voor retainers en aligners.',
  desc: 'Medisch-gecertificeerde UV-C pod. 6-minuten cyclus, 99.9% pathogeenreductie.',
  price: '€79,00',
  unit: 'per stuk',
  moq: 'Vanaf 6 stuks',
  stock: 'Op voorraad',
};

const ORALTEC_CUSTOM = {
  sku: 'ONE-CUSTOM',
  name: 'Oraltec One — Eigen branding',
  tagline: 'Jouw praktijk op de pod. Levering 3–4 weken.',
  desc: 'Laat Oraltec One personaliseren met je praktijklogo en kleuren. Minimum 25 stuks.',
  price: 'v.a. €89,00',
  unit: 'per stuk',
  moq: 'Min. 25 stuks',
  stock: 'Op aanvraag',
};

const ORALTEC_TEAM = [
  { name: 'Dr. Lieke van Daal', role: 'Hoofdorthodontist', email: 'l.vandaal@praktijk.nl',  init: 'LD' },
  { name: 'Sem Bergkamp',       role: 'Praktijkmanager',   email: 's.bergkamp@praktijk.nl', init: 'SB' },
  { name: 'Fatima El Amrani',   role: 'Assistent',         email: 'f.elamrani@praktijk.nl', init: 'FE' },
  { name: 'Joris Vermeer',      role: 'Inkoop',            email: 'j.vermeer@praktijk.nl',  init: 'JV' },
];

const ORALTEC_DOCS = [
  { name: 'Factuur OT-2948.pdf',          type: 'Factuur',     size: '84 KB',  date: '18 Apr 2026' },
  { name: 'Branding-richtlijnen OT.pdf',  type: 'Handleiding', size: '640 KB', date: '10 Apr 2026' },
  { name: 'Onderhoudscertificaat Q1.pdf', type: 'Certificaat', size: '212 KB', date: '01 Apr 2026' },
  { name: 'Factuur OT-2902.pdf',          type: 'Factuur',     size: '82 KB',  date: '14 Mar 2026' },
];

const ORALTEC_NAV = [
  { key: 'overview',  label: 'Overzicht' },
  { key: 'orders',    label: 'Bestellingen' },
  { key: 'custom',    label: 'Custom aanvragen' },
  { key: 'schedule',  label: 'Planning' },
  { key: 'team',      label: 'Team' },
  { key: 'docs',      label: 'Documenten' },
  { key: 'messages',  label: 'Berichten' },
  { key: 'settings',  label: 'Instellingen' },
];

Object.assign(window, {
  ORALTEC_ORDERS, ORALTEC_PRODUCT, ORALTEC_CUSTOM, ORALTEC_TEAM, ORALTEC_DOCS, ORALTEC_NAV
});
