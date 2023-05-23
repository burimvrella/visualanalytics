import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl = './countries-50m.json';

export const useData = () => {
    const [data, setData] = useState(null);
    console.log(data);

    useEffect(() => {
        json(jsonUrl).then(topoJson => {
            const { countries, land } = topoJson.objects;
            setData({
                land: feature(topoJson, land), // convert topoJSON to geoJSON
                interiors: mesh(topoJson, countries, function(a, b) { return a !== b; })  // excluding exterior boarders of countries
            });
        });
    });

    return data;
};

