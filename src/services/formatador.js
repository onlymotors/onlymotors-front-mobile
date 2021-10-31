import numeral from 'numeral';

numeral.register('locale', 'pt', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'mil',
    million: 'mi',
    billion: 'bi',
    trillion: 'tri'
  },
  ordinal: function (number) {
    return '.º';
  },
  currency: {
    symbol: 'R$'
  }
});

numeral.locale('pt');

export default numeral;