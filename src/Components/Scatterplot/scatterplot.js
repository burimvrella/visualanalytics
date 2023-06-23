import React, {useRef, useEffect, useContext} from 'react'
import './scatterplot.css'
import * as d3 from 'd3';
import SettingsContext from '../Settings/settingscontext';


function drawScatterplot(data,xAxisName,yAxisName,svgRef){
  const width = 490;
  const height = 390;
  //console.log(yAxisName, xAxisName)

  const svg = d3.select(svgRef.current)
                  .attr('width', width)
                  .attr('height', height)
                  .style('overflow','visible')
                  .style('margin', '20px') // TODO check later if needed
                  .style('margin-left', '45px');


    
    const xScale = d3.scalePoint()
                    .domain(data.map(function(d) { return d[xAxisName]; }))
                    .range([0,width]);

    const yScale = d3.scalePoint()
                    .domain(data.map(function(d) { return d[yAxisName]; }))
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
        .style("text-anchor", "start")
        .style("margin","20px");
      

    svg.append('g')
      .call(yAxis);
  
    svg.append('text')
        .attr('x', width/2 - 10)
        .attr('y', height + 35)
        .text('X Axis');

    svg.append('text')
        .attr('id','yaxis')
        .attr('y', height/16 - 40)
        .attr('x', width/16 - 100)
        .text('Y Axis');

        
    svg.selectAll()
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[xAxisName]))
        .attr('cy', d => yScale(d[yAxisName]))
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
  
}

export default function Scatterplot(props) {

  const infoSettings = useContext(SettingsContext);

  //console.log(settingsContext.age)
  const svgRef = useRef();


  useEffect(() => {

    console.log(infoSettings.xAxis)
    console.log(infoSettings.yAxis)
    if(infoSettings.xAxis != "" && infoSettings.yAxis != "")
    {
      drawScatterplot(props.data,infoSettings.xAxis,infoSettings.yAxis,svgRef)
    }

  },[props.data,infoSettings]);

  if (props.data.length === 0 || infoSettings.xAxis === "" || infoSettings.yAxis === "") {
    return (
    <div className="Down-Right-Scatter">
       <pre>Loading...</pre>
       </div>
       )
  }
  else{
    return (
      <div className="Down-Right-Scatter">
        <div className='title'>Scatterplot {infoSettings.xAxis} vs {infoSettings.yAxis}</div>
      <svg viewBox="0 0 450 400" ref={svgRef}></svg>
      </div>
      )
  }


}
