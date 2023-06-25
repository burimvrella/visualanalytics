import React, {useRef, useEffect, useContext} from 'react'
import './scatterplot.css'
import * as d3 from 'd3';
import SettingsContext from '../Settings/settingscontext';


function drawScatterplot(data,xAxisName,yAxisName,svgRef){

  const width = 500;
  const height = 400;
  const svg =  d3.select(svgRef.current)
  svg.selectAll('g').remove()
  svg.selectAll('circle').remove()
  svg.selectAll('text').remove()

  svg.attr('width', width)
    .attr('height', height)
    .style('overflow','visible')
    .style('margin', '20px')
    .style('margin-left', '45px');
  
    if(!isNaN(data[0][xAxisName]))
    {
      console.log("sortX")
      data.sort((p1, p2) =>  ((parseInt(p1[xAxisName]) < parseInt(p2[xAxisName])) ? -1 : (parseInt(p1[xAxisName]) > parseInt(p2[xAxisName])) ? 1 : 0));
    }
    else
    {
      console.log("sortXelse")
      data.sort((p1, p2) =>  (p1[xAxisName] < p2[xAxisName]) ? -1 : (p1[xAxisName] > p2[xAxisName]) ? 1 : 0)
    }

    if(!isNaN(data[0][yAxisName]))
    {
      data.sort((p1, p2) =>  ((parseInt(p1[yAxisName]) < parseInt(p2[yAxisName])) ? -1 : (parseInt(p1[yAxisName]) > parseInt(p2[yAxisName])) ? 1 : 0));
    }
    else
    {
      data.sort((p1, p2) =>  (p1[yAxisName] < p2[yAxisName]) ? -1 : (p1[yAxisName] > p2[yAxisName]) ? 1 : 0)
    }

    
    const xScale = d3.scalePoint()
                    .domain(data.map(function(d) { return d[xAxisName]; }))
                    .range([0,width]);

    const yScale = d3.scalePoint()
                    .domain(data.map(function(d) { return d[yAxisName]; }))
                    .range([height,0]);

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr("class", "xaxis")
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
    .attr("class", "yaxis")
      .call(yAxis);

    svg.append('text')
      .attr('x', width/2 - 10)
      .attr('y', height + 40)
      .text(xAxisName);

    svg.append('text')
      .attr('id','yaxis')
      .attr('y', height/4 - 10)
      .attr('x', width/2 - 90)
      .text(yAxisName);


    var tooltip = d3.select("Down-Right-Scatter")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")


    var mouseover = function(d) {
      tooltip
        .style("opacity", 1)
    }
  
    var mousemove = function(event,d) {
      tooltip
        .html("Test")
        .style("left", (d3.pointer(event)[0] + 30) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", d3.pointer(event)[1] + "px")
    }
  
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var mouseleave = function(d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
      }
      

    svg.selectAll()
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[xAxisName]))
        .attr('cy', d => yScale(d[yAxisName]))
        .attr('r', 2)
        .on("mouseover", mouseover )
        .on("mousemove", mousemove )
        .on("mouseleave", mouseleave) 



        if(xAxisName === 'ID')
        {
          svg.selectAll('.xaxis text').remove();
          svg.selectAll('.xaxis line').remove();
        }
        if(yAxisName === 'ID')
        {
          svg.selectAll('.yaxis text').remove();
          svg.selectAll('.yaxis line').remove();
        }
  
}

export default function Scatterplot(props) {

  const infoSettings = useContext(SettingsContext);

  const svgRef = useRef(null);

  useEffect(() => {

    if(infoSettings.scatterplotCountry !== ""){
      if(infoSettings.xAxis !== "" && infoSettings.yAxis !== "")
      {
        var tempdata = []
        var counter = 0
        props.data.forEach(row => {
          if(row["Country"] === infoSettings.scatterplotCountry)
          {
            if(row["YearsCode"] == "")
            {
              row["YearsCode"] = "0"
            }
            row['ID'] = counter
            tempdata.push(row)
          }
          counter += 1
        });
        drawScatterplot(tempdata,infoSettings.xAxis,infoSettings.yAxis,svgRef)
      }
    }

  },[infoSettings]);

  if (props.data.length === 0 || infoSettings.xAxis === "" || infoSettings.yAxis === "") {
    return (
    <div className="Down-Right-Scatter">
       <pre>Loading...</pre>
       </div>
       )
  }else{
    
    return (
      <div className="Down-Right-Scatter">
        <div className='title'>Scatterplot {infoSettings.xAxis} vs {infoSettings.yAxis} in {infoSettings.scatterplotCountry}</div>
        <svg viewBox="0 0 450 400" ref={svgRef}></svg>
      </div>
      )

  }

}
