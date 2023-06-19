import React, {useEffect, useState} from 'react';
import {csv} from 'd3';

const jsonUrl = './ProgrammingLanguageUser.csv';
export const LoadTreeMapData = () => {
  const [data, setData] = useState(null);
  //console.log('loadCsvData()');

  useEffect(() => {
    csv(jsonUrl).then(setData)
  }, []);

  return data;
};

