import {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './worldmap.css'

const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();
const width = 1200;
const height = 500;

export default function Worldmap({geoJson,data}) {
  const svgRef = useRef();
  const gref = useRef();
  var selectedCountry = document.getElementById("selectedCountry");
  const handleZoom = ({transform}) => {
    gref.current.setAttribute('transform', transform.toString());
  };

  const zoom = d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 12])
    .on('zoom', handleZoom);

  useEffect(() => {
    const svgElement = d3.select(svgRef.current);

    var Tooltip = d3.select('#asdf')
      .append("span")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
    var mouseover = function(d) {
      Tooltip
        .style("opacity", 1)
    }
    var mousemove = function(d) {
      Tooltip
        .html(d.originalTarget.id)
        .st
        .style("left", (d.x) + "px")
        .style("top", (d.y) + "px")
    }
    var mouseleave = function(d) {
      Tooltip
        .style("opacity", 0)
    }

    console.log(svgElement)
    svgElement.call(zoom);
    svgElement.selectAll('path')
      .each(function() {
        svgElement
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
        })
    // Three function that change the tooltip when user hover / move / leave a cell


    
    return () => {
      svgElement.on('.zoom', null);
    };
  });

  if (!geoJson) {
    return <pre>Loading...</pre>;
  }

  if (!data) {
    return <pre>Loading...</pre>;
  } else {
    var max = Math.max(...data.map(o => o.CompYearEur))
    var min = Math.min(...data.map(o => o.CompYearEur))
  }

  return (
    <div className="Up-Worldmap" id={"asdf"}>
      <span id="selectedCountry"></span>
      <svg ref={svgRef} id={'asdfg'} viewBox="0 0 1200 500">
        <g className="marks" ref={gref}>
          <path className="sphere" d={path({type: 'Sphere'}).attr} /* outline of the globe */ />
          {geoJson.countries.features.map(feature => (
            <path className="country" id={feature.properties.name} d={path(feature)} />
          ))}
          <path className="interiors" d={path(geoJson.interiors)}/>
        </g>
      </svg>
    </div>
  )
}
