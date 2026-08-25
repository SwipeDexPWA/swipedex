const prices = {
  PH: {
    basic: '₱500<small>/Year</small>',
    standard: '₱750<small>/Year</small>',
    premium: '₱1000<small>/Year</small>',
    pwa: '₱500',
    opw: '₱500',
    add: '₱250',
    nfc: '₱250',
    rev: '₱125'
  },
  INTL: {
    basic: '$15<small>/Year</small>',
    standard: '$25<small>/Year</small>',
    premium: '$35<small>/Year</small>',
    pwa: '$15',
    opw: '$15',
    add: '$10',
    nfc: '$10',
    rev: '$5'
  }
};
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const region = timezone === 'Asia/Manila' ? 'PH' : 'INTL';
document.getElementById('basic-price').innerHTML = prices[region].basic;
document.getElementById('standard-price').innerHTML = prices[region].standard;
document.getElementById('premium-price').innerHTML = prices[region].premium;
document.getElementById('pwa-price').innerHTML = prices[region].pwa;
document.getElementById('opw-price').innerHTML = prices[region].opw;
document.getElementById('add-price').innerHTML = prices[region].add;
document.getElementById('nfc-price').innerHTML = prices[region].nfc;
document.getElementById('rev-price').innerHTML = prices[region].rev;