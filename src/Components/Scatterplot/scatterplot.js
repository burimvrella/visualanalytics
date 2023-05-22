import React, {useRef, useEffect} from 'react'
import './scatterplot.css'
import * as d3 from 'd3';

export default function Scatterplot(props) {

  console.log(props.data.length)
  const svgRef = useRef();

  useEffect(() => {
    const width = 490;
    const height = 390;
    const svg = d3.select(svgRef.current)
                  .attr('width', width)
                  .attr('height', height)
                  .style('overflow','visible')
                  .style('margin', '20px') // TODO check later if needed
                  .style('margin-left', '45px');

    const xScale = d3.scaleLinear()
                    .domain([0,100])
                    .range([0,width]);

    const yScale = d3.scaleLinear()
                    .domain([0,200])
                    .range([height,0]);

    const xAxis = d3.axisBottom(xScale).ticks(props.data.length);

    const yAxis = d3.axisLeft(yScale).ticks(10);

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`);

    svg.append('g')
      .call(yAxis);

    
    svg.append('text')
    .style('text-anchor', 'middle')
      .attr('x', width/2)
      .attr('y', - 10)
      .text('Scatterplot with random data');
    
    svg.append('text')
        .attr('x', width/2)
        .attr('y', height + 35)
        .text('X Axis');

    svg.append('text')
        .attr('x', -35)
        .attr('y', height/2)
        .style('text-anchor', 'end')
        .attr('dx','18em')
        .attr('dy', "-11em")
        .attr('transform','rotate(90)')
        .text('Y Axis');

        
    svg.selectAll()
        .data(props.data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', 2)
        .on('mouseover', function(d, i) {
          // make the mouseover'd element
          // bigger and red
          d3.select(this)
            .transition()
            .duration(50)
            .attr('r', 4)
            .attr('fill', '#ff0000');
        })
        .on('mouseout', function(d, i) {
          // return the mouseover'd element
          // to being smaller and black
          d3.select(this)
            .transition()
            .duration(50)
            .attr('r', 2)
            .attr('fill', '#000000');
        });  

  },[props.data]);

  return (
  <div className="Down-Right-Scatter">
  <svg viewBox="0 0 450 400" ref={svgRef}></svg>
  </div>
  )
}
