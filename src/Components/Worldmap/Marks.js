import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ data: { countries, interiors } }) => {
    function clicked() {
        alert('clicked!')
    }

    return(
        <g className="marks">
            <path className="sphere" d={path({ type: 'Sphere' })} /> // outline of the globe
            <path className="graticules" d={path(graticule())} />
            {countries.features.map(feature => (
                <path className="country" d={path(feature)} onClick={clicked} />
            ))}
            <path className="interiors" d={path(interiors)} />
        </g>
    );
}
