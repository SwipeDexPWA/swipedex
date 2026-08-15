const prices = {
  PH: {
    basic: '₱500<small>/Year</small>',
    standard: '₱750<small>/Year</small>',
    premium: '₱1000<small>/Year</small>'
  },
  INTL: {
    basic: '$30<small>/Year</small>',
    standard: '$40<small>/Year</small>',
    premium: '$50<small>/Year</small>'
  }
};
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const region = timezone === 'Asia/Manila' ? 'PH' : 'INTL';
document.getElementById('basic-price').innerHTML = prices[region].basic;
document.getElementById('standard-price').innerHTML = prices[region].standard;
document.getElementById('premium-price').innerHTML = prices[region].premium;