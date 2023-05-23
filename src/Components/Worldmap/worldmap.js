import React from 'react'
import './worldmap.css'
import {useData} from "./useData";
import { Marks } from './Marks';

export default function Worldmap() {
  const geoJson = useData();
  console.log(geoJson);

  if (!geoJson) {
    return <pre>Loading...</pre>;
  }
  return (
      <div className="Up-Worldmap">
        <svg width={1200} height={500}>
          <Marks data={geoJson} />
        </svg>
      </div>
  )
}
