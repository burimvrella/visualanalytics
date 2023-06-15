import {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './worldmap.css'

const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();
const width = 1200;
const height = 500;

export default function Worldmap({geoJson}) {
  const svgRef = useRef();
  const gref = useRef();
  const handleZoom = ({transform}) => {
    gref.current.setAttribute('transform', transform.toString());
  };

  const zoom = d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 12])
    .on('zoom', handleZoom);

  useEffect(() => {
    const svgElement = d3.select(svgRef.current);
    svgElement.call(zoom);
    return () => {
      svgElement.on('.zoom', null);
    };
  });

  if (!geoJson) {
    return <pre>Loading...</pre>;
  }
  return (
    <div className="Up-Worldmap">
      <svg ref={svgRef} viewBox="0 0 1200 500">
        <g className="marks" ref={gref}>
          <path className="sphere" d={path({type: 'Sphere'})} /* outline of the globe */ />
          <path className="graticules" d={path(graticule())}/>
          {geoJson.countries.features.map(feature => (
            <path className="country" d={path(feature)}/>
          ))}
          <path className="interiors" d={path(geoJson.interiors)}/>
        </g>
      </svg>
    </div>
  )
}
