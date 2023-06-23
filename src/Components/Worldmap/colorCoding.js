import {convertNameToId} from './worldmap'

function calcMean(array) {
  let sum = 0;
  for( let i = 0; i < array.length; i++ ){
    if (array[i] === '') {
      continue;
    }
    sum += parseInt( array[i], 10 ); //don't forget to add the base
  }
  return sum/array.length;
}
function calcAverageEdLevel(data) {
  let countryStats = {}

  data.map(row => {
    let countryId = convertNameToId(row.Country)
    if (!countryStats[countryId]) {
      countryStats[countryId] = [];
    }
    countryStats[countryId].push(row.EdLevel);
  })
  //console.log(countryStats['Germany'])
  let min = 1000000;
  let max = 0;
  Object.keys(countryStats).forEach(key => {
    let avg = calcMean(countryStats[key]);
    let len = countryStats[key]
    countryStats[key] = [(avg)];
    if (avg < min) {
      min = avg;
    }
    if (avg > max) {
      max = avg;
    }
    //console.log("Average Edlevel of " + key + " = " + avg + " len: " + len);
  });
  return [min, max, countryStats];
}

function calcAverageCompensation(data) {
  let countryStats = {}

  data.map(row => {
    if (!countryStats[row.Country]) {
      countryStats[row.Country] = [];
    }
    countryStats[row.Country].push(row.CompYearEur);
  })
  //console.log(countryStats['Germany'])
  let min = 1000000;
  let max = 0;
  Object.keys(countryStats).forEach(key => {
    let avg = calcMean(countryStats[key]);
    let len = countryStats[key];
    countryStats[key] = [(avg)];
    if (avg < min) {
      min = avg;
    }
    if (avg > max) {
      max = avg;
    }
    console.log("Average Edlevel of " + key + " = " + avg + " len: " + len);
  });
  return [min, max, countryStats];
}

export const colorCoding = (data) => {
  if (!data) {
    return null
  }
  const [min, max, countrystats] = calcAverageEdLevel(data)
  //console.log(min + " | " + max + " | " + countrystats)
  return [min, max, countrystats]
}