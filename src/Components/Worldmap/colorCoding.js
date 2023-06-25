import {convertNameToId} from './worldmap'


/*
Description:
  Calcutaes the Mean value of the given array
*/
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


/*
Description:
  Calcutaes the average education level value of the given dataset
*/
function calcAverageEdLevel(data, progLangFilter, compFilter) {
  let countryStats = {}
  data.map(row => {
    let countryId = convertNameToId(row.Country)
    if (!countryStats[countryId]) {
      countryStats[countryId] = [];
    }
    if (progLangFilter !== '' && row[progLangFilter] === '0') {
      return
    }
    if (compFilter[0] !== 0 || compFilter[1] !== 0) {
      //console.log('compFilterActivated')
      const compensation = parseInt(row.CompYearEur)
      if (compensation < compFilter[0] || compensation > compFilter[1]) {
        return;
      }
    }
    countryStats[countryId].push(row.EdLevel)
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
    // console.log("Average Edlevel of " + key + " = " + avg + " len: " + len);
  });
  return [min, max, countryStats];
}

/*
Description:
  Calcutaes the average compensation value of the given dataset
*/
function calcAverageCompensation(data) {
  let countryStats = {}

  data.map(row => {
    let countryId = convertNameToId(row.Country)

    if (!countryStats[countryId]) {
      countryStats[countryId] = [];
    }
    countryStats[countryId].push(row.CompYearEur);
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
    // console.log("Average Compensation of " + key + " = " + avg + " len: " + len);
  });
  return [min, max, countryStats];
}

/*
Description:
  Calcutaes the number of programmers per country of the given dataset
*/
function calcNumberOfProgrammers(data) {
  let countryStats = {}

  data.map(row => {
    let countryId = convertNameToId(row.Country)

    if (!countryStats[countryId]) {
      countryStats[countryId] = 0;
    }
    countryStats[countryId] += 1;
  })

   let min = 1000000;
   let max = 0;
  Object.keys(countryStats).forEach(key => {
    let numProgrammers = countryStats[key]
    if (numProgrammers < min) {
       min = numProgrammers;
     }
     if (numProgrammers > max) {
       max = numProgrammers;
     }
     // console.log("#Programmers of " + key + " = " + numProgrammers);
   });
  return [min, max, countryStats];
}


/*
Description:
  Crates the color coding of the heatmap
*/
export const colorCoding = (data, heatMapVisu, progLangFilter, compFilter) => {
  if (!data) {
    return [0, 0, null]
  }
  let min = 0;
  let max = 0;
  let countrystats = null;
  if (heatMapVisu === 'NumProgCountry') {
    [min, max, countrystats] = calcNumberOfProgrammers(data);
  } else if (heatMapVisu === 'CompYearCountry') {
    [min, max, countrystats] = calcAverageCompensation(data);
  } else {
    // console.log('progLangFilter: ' + progLangFilter + ' compFilter' + compFilter);
    [min, max, countrystats] = calcAverageEdLevel(data, progLangFilter, compFilter);
  }
  return [min, max, countrystats];
}