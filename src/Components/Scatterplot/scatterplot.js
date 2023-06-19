import React, {useRef, useEffect, useContext} from 'react'
import './scatterplot.css'
import * as d3 from 'd3';
import SettingsContext from '../Settings/settingscontext';

export default function Scatterplot(props) {

  const settingsContext = useContext(SettingsContext);

  //console.log(settingsContext.age)
  //console.log(props.data.length)
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


    const xScale = d3.scalePoint()
                    .domain(props.data.map(function(d) { return d.Country; }))
                    .range([0,width]);

    const yScale = d3.scalePoint()
                    .domain(props.data.map(function(d) { return d.Employment; }))
                    .range([height,0]);

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr("class", "x axis")
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`)
      .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");
      

    svg.append('g')
      .call(yAxis);

    
    svg.append('text')
      .attr('id','title')
      .attr('x', width/2)
      .attr('y', - 10)
      .text('Scatterplot with random data');
    
    svg.append('text')
        .attr('x', width/2 - 10)
        .attr('y', height + 35)
        .text('X Axis');

    svg.append('text')
        .attr('id','yaxis')
        .attr('y', width/10 )
        .attr('x', height/2 - 35)
        .text('Y Axis');

        
    svg.selectAll()
        .data(props.data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.Country))
        .attr('cy', d => yScale(d.Employment))
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
