import {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './worldmap.css'
import {colorCoding} from './colorCoding'

const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();
const width = 1200;
const height = 500;

export default function Worldmap({geoJson, data}) {
  const svgRef = useRef();
  const gRef = useRef();
  const divRef = useRef();
  let selectedCountry, selectedCountryColor = null;
  let countryStats = null;
  const handleZoom = ({transform}) => {
    gRef.current.setAttribute('transform', transform.toString());
  };

  const zoom = d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 12])
    .on('zoom', handleZoom);

  useEffect(() => {
    const svgElement = d3.select(svgRef.current);

    var tooltip = d3.select(divRef.current)
      .append("span")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
    const mouseover = function (event, d) {
      tooltip
        .style("opacity", 1)
    }
    const mousemove = function (event, d) {
      if (event.originalTarget.id) {
        tooltip
          .html(event.originalTarget.id + "<br/>" +  Number(countryStats[event.originalTarget.id]).toFixed(2))
          .style("left", (event.x + 10) + "px")
          .style("top", (event.y + 10) + "px")
          .style('position', 'absolute')
          .transition()
      } else {
        mouseleave(event, d)
      }
    }
    const mouseleave = function (event, d) {
      tooltip
        .transition()
        .duration(20)
        .style("opacity", 0)
    }

    svgElement.call(zoom);
    svgElement.selectAll('path')
      .each(function () {
        svgElement
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
      })

    return () => {
      svgElement.on('.zoom', null);
    };
  });

  if (!data || !geoJson) {
    return (
      <div className="Up-Worldmap" >
        <h1>Worldmap</h1>
        <pre>Loading...</pre>
      </div>
    )}

  let min = 0;
  let max = 0;
  [min, max, countryStats] = colorCoding(data)
  const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([min, max]);

  // ToDo: geoJson and survey country names include different notation
//  let geosJsonCountries = new Map();
//  geoJson.countries.features.map(feature => (
//    geosJsonCountries.set(feature.properties.name, 1)
//  ));
//  let diffCountries = []
//  Object.keys(countryStats).forEach(key => {
//    if (!geosJsonCountries.has(key)) {
//      diffCountries.push(key)
//    }
//  });
//  console.log(geosJsonCountries)
//  console.log(diffCountries)

  const mouseclick = function (event, d) {
    // console.log(event)
    // console.log(event.target.id)
    if (selectedCountry){
      d3.select(selectedCountry).style('fill', selectedCountryColor)
      selectedCountry = null;
    }
    selectedCountry = event.target;
    selectedCountryColor = event.target.fill
    d3.select(event.target).style('fill', 'red')
    return event.target
  }

  return (
    <div ref={divRef} className="Up-Worldmap" >
      <span id="selectedCountry"></span>
      <svg ref={svgRef} viewBox="0 0 1200 500">
        <g className="marks" ref={gRef}>
          <path className="sphere" d={path({type: 'Sphere'}).attr} /* outline of the globe */ />
          {geoJson.countries.features.map(feature => (
            <path className="country" id={feature.properties.name} d={path(feature)} fill={
              colorScale(countryStats[feature.properties.name])
            } onClick={mouseclick} />
          ))}
          <path className="interiors" d={path(geoJson.interiors)}/>
        </g>
      </svg>
    </div>
  )
}
