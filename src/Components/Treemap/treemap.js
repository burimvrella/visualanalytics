import React, {useRef} from 'react'
import './treemap.css'
import * as d3 from 'd3';

const width = 600;
const height = 400;

export default function Treemap({data}) {
  const svgRef = useRef(null);

  function renderTreemap() {
    const svg = d3.select(svgRef.current);

    svg.attr('width', width).attr('height', height);

    var root = d3.stratify()
      .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
      .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
      (data);
    root.sum(function(d) { return + d.value })   // Compute the numeric value for each entity

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

  if (!data) {
    return <pre>Loading...</pre>;
  }
  renderTreemap()

  return (
    <div className="Down-Left-Treemap">
      <h1>Treemap</h1>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  )
}
