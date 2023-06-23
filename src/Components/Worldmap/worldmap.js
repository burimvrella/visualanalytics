import {useContext, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './worldmap.css'
import {colorCoding} from './colorCoding'
import SettingsContext from '../Settings/settingscontext';

const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);
//const graticule = d3.geoGraticule();
const width = 1200;
const height = 500;

export function convertNameToId(name) {
  let id = name.replace(/ /g, '_');
  id = id.replace(/\./g, '');
  // console.log('Name: ' + name + ' id: ' + id)
  return id;
}

function convertIdToName(name) {
  let id = name.replace(/_/g, ' ');
  // console.log('Name: ' + name + ' id: ' + id)
  return id;
}

export default function Worldmap({geoJson, data}) {
  const svgRef = useRef();
  const gRef = useRef();
  const divRef = useRef();

  var infoSettings = useContext(SettingsContext);
  
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
    console.log('Chosen country:' + infoSettings.country)
    if (infoSettings.country) {
      let countryId = convertNameToId(infoSettings.country)
      d3.select('#' + countryId).style('fill', 'orange')
    }

    console.log(infoSettings.income)
    console.log(infoSettings.heatmap)
    console.log(infoSettings.programmingLanguage)

  },[infoSettings])

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
          .html(convertIdToName(event.originalTarget.id) + "<br/>" +  Number(countryStats[event.originalTarget.id]).toFixed(2))
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
  if (!countryStats) {
    return (
      <div className="Up-Worldmap" >
        <h1>Worldmap</h1>
        <pre>Loading...</pre>
      </div>
    )}
  // colorCoding(data)
  const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([min, max]);

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
            <path className="country" id={convertNameToId(feature.properties.name)} d={path(feature)}
                  fill={colorScale(countryStats[convertNameToId(feature.properties.name)])} onClick={mouseclick}
            />
          ))}
          <path className="interiors" d={path(geoJson.interiors)}/>
        </g>
      </svg>
    </div>
  )
}
