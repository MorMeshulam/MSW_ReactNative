import _ from 'lodash';
import { MSWData } from './msw.mock';

export const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
export const daysEn = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

let labels = [];
let swellData = [];
let chartSwell = null;

export const translateTimeStamp = ts => {
  let time = moment.unix(ts);
  // console.log('time._d:', time._d);
  return time._d;
};

export const filterForecast = () => {
  let keepers = [];
  this.state.data.forEach(forecast => {
    forecast.swell.components.primary.height > 3
      ? keepers.push(forecast)
      : null;
  });
  this.setState({ keepers });
};

export const initForecastData = data => {

  const fetchedData = [];

  let highestSwell = 0;
  let lastDayPart = null;

  const dataIsOk = _.isEmpty(data) || !_.isArray(data) ? false : true;
 
  if (!dataIsOk) {
    data = MSWData;
  }

  //reset values
  labels = [];
  swellData = [];
  chartSwell = null;

  // console.log('Forecast',data);

  data.forEach((forcast, i) => {
    const {
      localTimestamp,
      fadedRating,
      solidRating,
      swell,
      wind,
      condition,
      charts,
    } = forcast;

    const primary = swell.components.primary;
    const dateOfForecast = new Date(localTimestamp * 1000);

    const dayOfForecast = days[dateOfForecast.getDay()];
    const dayOfForecastEn = daysEn[dateOfForecast.getDay()];

    const height = primary && primary.height;
    const period = primary && primary.period;
    const swellDirection = primary && primary.direction;

    if (!labels.includes(dayOfForecast)) labels.push(dayOfForecast);

    if (height && highestSwell < height) {
      highestSwell = height;
      chartSwell = charts.swell;
    }

    const time = dateOfForecast.getHours();
    let dayPart = null;

    if (time > 0 && time <= 8) dayPart = '6am';
    if (time > 8 && time <= 17) dayPart = 'Noon';
    if (time > 17 && time <= 24) dayPart = '6pm';

    const dataHasDayPart = fetchedData.find(
      f => f.dayPart === dayPart && f.dayOfForecast === dayOfForecast,
    );

    if (!dataHasDayPart) {
     
      const dataRecord = {
        dateOfForecast,
        dayOfForecast,
        dayOfForecastEn,
        dayPart,

        fadedRating,
        solidRating,
        height: height || 'Flat',
        period: period || '',
        swellDirection,
        direction: primary && primary.direction + 180,
        compassDirection: primary && primary.compassDirection,
        wind,
        condition,
        swell,
        swellChart: charts.swell,
      };

      if (height) swellData.push(height);
      fetchedData.push(dataRecord);
    }
  });

  // console.log(fetchedData)
  return { fetchedData, labels, chartSwell, swellData };
};
