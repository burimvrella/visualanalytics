import React, {useContext, useEffect, useRef} from 'react'
import './treemap.css'
import * as d3 from 'd3';
import SettingsContext from '../Settings/settingscontext';


const width = 600;
const height = 400;
/*
Description:
  Draws the Treemap
Params:
  treemapData -> The dataset used to draw the treemap
  infoSettings -> The context that contains the react state var
  minValue -> Min value to dertinmate the range of the shown data in the treemap
  maxValue -> Max value to dertinmate the range of the shown data in the treemap
  svgRef -> A react reference of the SVG file
*/
function renderTreemap(svgRef, treemapData, infoSettings, minValue, maxValue) {
  const svg = d3.select(svgRef.current);
  svg.selectAll('g').remove();

  svg.attr('width', width).attr('height', height);

  var root = d3.stratify()
    .id(function(d) { return d.name; })
    .parentId(function(d) { return d.parent; })
  (treemapData);
  root.sum(function(d) { return + d.value })

  const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

  const nodes = svg
    .selectAll('g')
    .data(treemapRoot.leaves())
    .join('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([minValue, maxValue + 100]);

  nodes
    .append('rect')
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('fill', (d) => colorScale(d.data.mean))
    .on("click", (event, d) => {
      infoSettings.setProgrammingLanguage(d.id);
    });

  const fontSize = 12;
  nodes
    .append('text')
    .text((d) => `${d.data.name}: ${d.data.value}`)
    .attr('font-size', `${fontSize}px`)
    .attr('x', 3)
    .attr('y', fontSize);
}

/*
Description:
  Filters the data of the given country
Params:
  data -> The whole dataset
  query_country -> The country name choosen by the user
*/
function filterData(query_country, data) {
  let progLangStats = {};
  let treemapData = [];
  let progLanguages = [];
  let salaryLanguage = {};

  data.columns.forEach(column => {
    if (column.includes("#")) {
      progLanguages.push(column)
      progLangStats[column] = 0;
    }
  })

  data.map(row => {
    if (row.Country === query_country) {
      let salary = 0
      progLanguages.forEach(language => {
        if (row[language] === '1') {
          progLangStats[language] += 1
          salary = salary + parseInt(row['CompYearEur'])
          salaryLanguage[language] = salary 
        }   
      });    
    }
  })

  Object.keys(salaryLanguage).forEach((language) => salaryLanguage[language] = Math.floor(salaryLanguage[language] / progLangStats[language]));

  let maxValue = 0;
  let minValue = 9999;
  
  Object.keys(salaryLanguage).forEach(name => {
    treemapData.push({"name": name, "parent": query_country, "value": progLangStats[name],"mean":salaryLanguage[name]})
    treemapData.sort((p1,p2) => (p1.value < p2.value) ? 1 : (p1.value > p2.value) ? -1 : 0)
  });
  let maxLength = 12;
  if (treemapData.length > maxLength) {
    treemapData.length = maxLength
  }
  treemapData.forEach(name => 
    {
    if (name.mean > maxValue) {
      maxValue = name.mean;
    }
    if (name.mean < minValue) {
      minValue = name.mean;
    }
    });
  treemapData.push({"name": query_country, "parent": "", "value": ""})
  return [treemapData, minValue, maxValue]
}

export default function Treemap({data}) {
  const infoSettings = useContext(SettingsContext);
  const svgRef = useRef(null);
  let query_country = 'United States of America'
  let treemap_data = '';
  let min = 0;
  let max = 0;

  useEffect(() => {
    // console.log('Chosen country:' + infoSettings.country)
    if (infoSettings.country !== "") {
      query_country = infoSettings.country;
      [treemap_data, min, max] = filterData(query_country, data)
      renderTreemap(svgRef, treemap_data, infoSettings, min, max)
    }
  },[infoSettings])

  if (data.length === 0) {
    return <pre>Loading...</pre>;
  }
  [treemap_data, min, max] = filterData(query_country, data)
  renderTreemap(svgRef, treemap_data, infoSettings, min, max)

  // Renders the HTML code 
  return (
    <div className="Down-Left-Treemap">
      <h1>Treemap of {infoSettings.country}</h1>
      <svg ref={svgRef} viewBox="0 0 450 400"></svg>
    </div>)
}
