import React, {useRef} from 'react'
import './treemap.css'
import * as d3 from 'd3';

const width = 600;
const height = 400;

function renderTreemap(svgRef,country) {
  const svg = d3.select(svgRef.current);

  svg.attr('width', width).attr('height', height);

  var root = d3.stratify()
    .id(function(d) { return d.child; })
    .parentId(function(d) { return d.parent; }) 
  (country);
  root.sum(function(d) { return + d.value }) 

  /*const root = d3.hierarchy(data)
    .sum((d) => d.Country)
    .sort((a, b) => b.Country - a.Country);
  */
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
    .attr('fill', (d) => colorScale(d.data.name));

  const fontSize = 12;
  nodes
    .append('text')
    .text((d) => `${d.data.name}: ${d.data.value}`)
    .attr('font-size', `${fontSize}px`)
    .attr('x', 3)
    .attr('y', fontSize);
}


export default function Treemap({data}) {
  const svgRef = useRef(null);

  var country = []
  var differtnProgLanguage = {}

  data.map(x => {
    if(x.Country === "United States of America")
    {
      var languages = x.LanguageHaveWorkedWith.split(";")
      languages.forEach(language => {
        if(!differtnProgLanguage[language]) {
          differtnProgLanguage[language] = 0
        }
          differtnProgLanguage[language] += 1
      });  
      var temp = [{"child": x.Country , "parent": "", "value" : "" }] 
      Object.keys(differtnProgLanguage).forEach(name => {
        temp.push({"child": name, "parent": x.Country, "value" : differtnProgLanguage[name]})
      });
      country = temp
    }
  })
    console.log(country.length)
    if (country.length === 0) {
      return <pre>Loading...</pre>;  
    }
    else{
      renderTreemap(svgRef,country)

      return (
        <div className="Down-Left-Treemap">
          <h1>Treemap</h1>
          <svg ref={svgRef} viewBox="0 0 450 400"></svg>
        </div>)
    }
}
