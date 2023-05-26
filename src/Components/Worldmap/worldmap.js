import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './worldmap.css'
import {useData} from "./useData";

export default function Worldmap() {
  const geoJson = useData();
  const svgRef = useRef();
  const gref = useRef();

    useEffect(() => {
        const svgElement = d3.select(svgRef.current);

        const zoom = d3.zoom()
            .extent([[0, 0], [1200, 500]])
            .scaleExtent([1, 4])
            .on('zoom', handleZoom);
        svgElement.call(zoom);

        return () => {
            svgElement.on('.zoom', null); // Cleanup zoom event listener
        };
    }, []);
    const handleZoom = ({transform}) => {

      gref.current.setAttribute('transform', transform.toString());
    };

    if (!geoJson) {
        return <pre>Loading...</pre>;
    }

    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);
    const graticule = d3.geoGraticule();

  return (
      <div className="Up-Worldmap">
        <svg ref={svgRef} width={1200} height={500}>
            <g className="marks" ref={gref}>
                <path className="sphere" d={path({ type: 'Sphere' })} /* outline of the globe */ />
                <path className="graticules" d={path(graticule())} />
                {geoJson.countries.features.map(feature => (
                    <path className="country" d={path(feature)} />
                ))}
                <path className="interiors" d={path(geoJson.interiors)} />
            </g>
        </svg>
      </div>
  )
}
