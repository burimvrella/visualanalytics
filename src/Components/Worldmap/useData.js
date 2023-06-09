import {useEffect, useState} from 'react';
import {json} from 'd3';
import {feature, mesh} from 'topojson';

const jsonUrl = './countries-50m.json';


/*
Description:
  Initialization of the data to render the worldmap
*/
export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topoJson => {
      const {countries} = topoJson.objects;
      setData({
        countries: feature(topoJson, countries), // convert topoJSON to geoJSON
        interiors: mesh(topoJson, countries, function (a, b) {return a !== b;})  // excluding exterior boarders of countries
      });
    });
  }, []);

  return data;
};

