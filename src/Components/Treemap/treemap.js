import React, {useEffect, useRef} from 'react'
import './treemap.css'
import * as d3 from 'd3';

const width = 600;
const height = 400;
const asdf =  {
  name: 'Celtics',
  children: [
    {
      name: 'Guards',
      children: [
        {
          category: 'Guards',
          name: 'Kemba Walker',
          value: 20.4,
        },
        {
          category: 'Guards',
          name: 'Marcus Smart',
          value: 12.9,
        },
        {
          category: 'Guards',
          name: 'Brad Wanamaker',
          value: 6.9,
        },
        {
          category: 'Guards',
          name: 'Tremont Waters',
          value: 3.6,
        },
        {
          category: 'Guards',
          name: 'Carsen Edwards',
          value: 3.3,
        },
        {
          category: 'Guards',
          name: 'Romeo Langford',
          value: 2.5,
        },
      ],
    },
    {
      name: 'Forwards',
      children: [
        {
          category: 'Forwards',
          name: 'Jayson Tatum',
          value: 23.4,
        },
        {
          category: 'Forwards',
          name: 'Jaylen Brown',
          value: 20.3,
        },
        {
          category: 'Forwards',
          name: 'Gordon Hayward',
          value: 17.5,
        },
        {
          category: 'Forwards',
          name: 'Grant Williams',
          value: 3.4,
        },
        {
          category: 'Forwards',
          name: 'Javonte Green',
          value: 3.4,
        },
        {
          category: 'Forwards',
          name: 'Semi Ojeleye',
          value: 3.4,
        },
        {
          category: 'Forwards',
          name: 'Vincent Poirier',
          value: 1.9,
        },
      ],
    },
    {
      name: 'Centers',
      children: [
        {
          category: 'Centers',
          name: 'Daniel Theis',
          value: 9.2,
        },
        {
          category: 'Centers',
          name: 'Enes Kanter',
          value: 8.1,
        },
        {
          category: 'Centers',
          name: 'Robert Williams III',
          value: 5.2,
        },
        {
          category: 'Centers',
          name: 'Tacko Fall',
          value: 3.3,
        },
      ],
    },
  ],
};

export default function Treemap() {
  const svgRef = useRef(null);
  let data= null;

  d3.csv('./data_hierarchy_1level.csv').then(csv_data => {
    console.log(csv_data)
    data = csv_data
    renderTreemap()
  });
  console.log(data)

  function renderTreemap() {
    const svg = d3.select(svgRef.current);

    svg.attr('width', width).attr('height', height);

    var root = d3.stratify()
      .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
      .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
      (data);
    root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

    const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

    console.log(treemapRoot.leaves)
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
      .attr('fill', (d) => colorScale(d.data.name));

  }

   useEffect(() => {
     if (data){
       console.log('There we are!')
      renderTreemap()
     }
   }, [data]);

  return (
  <div className="Down-Left-Treemap">
    <h1>Treemap</h1>
    <svg ref={svgRef} width={width} height={height}></svg>
  </div>
  )
}
