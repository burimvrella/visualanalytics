import {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './worldmap.css'

const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();
const width = 1200;
const height = 500;

export default function Worldmap({geoJson, data}) {
  const svgRef = useRef();
  const gRef = useRef();
  const divRef = useRef();
  var selectedCountry = document.getElementById("selectedCountry");
  const handleZoom = ({transform}) => {
    gRef.current.setAttribute('transform', transform.toString());
  };

  const zoom = d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 12])
    .on('zoom', handleZoom);

  useEffect(() => {
    const svgElement = d3.select(svgRef.current);

    var tooltip = d3.select(divRef.current) // d3.select('#world-map-div')
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
          .html(event.originalTarget.id)
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
    return <pre>Loading...</pre>;
  }
    var max = Math.max(...data.map(o => o.CompYearEur))
    var min = Math.min(...data.map(o => o.CompYearEur))

  return (
    <div ref={divRef} className="Up-Worldmap" id={"world-map-div"}>
      <span id="selectedCountry"></span>
      <svg ref={svgRef} viewBox="0 0 1200 500">
        <g className="marks" ref={gRef}>
          <path className="sphere" d={path({type: 'Sphere'}).attr} /* outline of the globe */ />
          {geoJson.countries.features.map(feature => (
            <path className="country" id={feature.properties.name} d={path(feature)}/>
          ))}
          <path className="interiors" d={path(geoJson.interiors)}/>
        </g>
      </svg>
    </div>
  )
}
