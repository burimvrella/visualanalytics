import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './worldmap.css'
import {useData} from "./useData";
import { Marks } from './Marks';

export default function Worldmap() {
  const geoJson = useData();
  const svgRef = useRef();

    useEffect(() => {
        const svgElement = d3.select(svgRef.current);

        const zoom = d3.zoom().on('zoom', handleZoom);
        svgElement.call(zoom);

        return () => {
            svgElement.on('.zoom', null); // Cleanup zoom event listener
        };
    }, []);
    const handleZoom = (event) => {
        //console.log('handleZoom()')
        const { transform } = event;
        svgRef.current.setAttribute('transform', transform.toString());
    };

  if (!geoJson) {
    return <pre>Loading...</pre>;
  }
  return (
      <div className="Up-Worldmap">
        <svg ref={svgRef} width={1200} height={500}>
          <Marks data={geoJson} />
        </svg>
      </div>
  )
}
