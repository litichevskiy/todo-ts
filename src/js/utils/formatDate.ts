import FormatedDateType from '../types/FormatedDateType';

const MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
const YEAR_IN_MS = 31536000000;

const formatDate = ( date :Date ) :FormatedDateType => {

  let year :number|string = date.getFullYear();
  let hours :number|string = date.getHours();
  let minutes :number|string = date.getMinutes();
  let month :number|string = date.getMonth();
  const day :number = date.getDate();
  const fullDateISO :string = `${year}-${addZero( month )}-${addZero( day )}`;

  hours = addZero(hours);
  minutes = addZero(minutes);
  month = MONTH[month];
  year = ( Date.now() - Number( date ) > YEAR_IN_MS ) ? year : '';

  return{ year, month, day, hours, minutes, fullDateISO };
};

const addZero = ( num :number ) :string|number => ( num < 10 ) ? `0${num}`: num;

export default formatDate;