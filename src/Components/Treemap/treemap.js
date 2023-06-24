import React, {useContext, useEffect, useRef} from 'react'
import './treemap.css'
import * as d3 from 'd3';
import SettingsContext from '../Settings/settingscontext';
import {convertNameToId} from "../Worldmap/worldmap";


const width = 600;
const height = 400;

function renderTreemap(svgRef, treemapData, infoSettings) {
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

  const fader = (color) => d3.interpolateRgb(color, '#fff')(0.3);
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

  nodes
    .append('rect')
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('fill', (d) => colorScale(d.data.name))
    .on("click", (event, d) => {
      infoSettings.setProgrammingLanguage(d.id)
    });

  const fontSize = 12;
  nodes
    .append('text')
    .text((d) => `${d.data.name}: ${d.data.value}`)
    .attr('font-size', `${fontSize}px`)
    .attr('x', 3)
    .attr('y', fontSize);
}

function filterData(query_country, data) {
  let progLangStats = {};
  let treemapData = [];
  let progLanguages = [];

  data.columns.forEach(column => {
    if (column.includes("#")) {
      progLanguages.push(column)
      progLangStats[column] = 0
    }
  })

  data.map(row => {
    if (row.Country === query_country) {
      progLanguages.forEach(language => {
        if (row[language] === '1') {
          progLangStats[language] += 1
        }
      });
    }
  })

  Object.keys(progLangStats).forEach(name => {
    treemapData.push({"name": name, "parent": query_country, "value": progLangStats[name]})
    treemapData.sort((p1,p2) => (p1.value < p2.value) ? 1 : (p1.value > p2.value) ? -1 : 0)
  });
  const maxLength = 12
  if (treemapData.length > maxLength) {
    treemapData.length = maxLength
  }
  treemapData.push({"name": query_country, "parent": "", "value": ""})
  return treemapData
}

export default function Treemap({data}) {
  const infoSettings = useContext(SettingsContext);
  const svgRef = useRef(null);
  let query_country = 'United States of America'
  let treemap_data = '';

  useEffect(() => {
    // console.log('Chosen country:' + infoSettings.country)
    if (infoSettings.country !== "") {
      query_country = infoSettings.country;
      treemap_data = filterData(query_country, data)
      renderTreemap(svgRef, treemap_data, infoSettings)
    }
  },[infoSettings])

  if (data.length === 0) {
    return <pre>Loading...</pre>;
  }
  treemap_data = filterData(query_country, data)
  renderTreemap(svgRef, treemap_data, infoSettings)

  return (
    <div className="Down-Left-Treemap">
      <h1>Treemap</h1>
      <svg ref={svgRef} viewBox="0 0 450 400"></svg>
    </div>)
}
