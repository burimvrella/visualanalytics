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
    console.log(svgElement)
    svgElement.call(zoom);
    svgElement.selectAll('path')
      .each(function() {
        svgElement.on('mouseover', function(event) {
          //TODO fix printing
          if(event.originalTarget.id === '')
            return
          else{
            selectedCountry.innerHTML =  event.originalTarget.id ;
            /*console.log( d3.select("#selectedCountry"))
            d3.select("#selectedCountry").append('text')
            .text(event.originalTarget.id)
            .attr("x", 10)
            .attr("y", 10);*/
          }
        })
        .on('mouseout', function(event) {
          selectedCountry.innerHTML = " ";
         /* d3.select("text").style("visibility","hidden")*/
          })
        

        })
    
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
    <div className="Up-Worldmap">
      <span id="selectedCountry"></span>
      <svg ref={svgRef} viewBox="0 0 1200 500">
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
