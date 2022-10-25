import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './stats.scss';

//implement animation and labels




const Chart = ({chartData}) => {


    const d3Chart = useRef();
    const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})
	// Ref for resize event update
	const update = useRef(false);

    useEffect(()=>{

		// Listen for any resize event update
		window.addEventListener('resize', ()=>{
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			})

			// If resize, remove the previous chart
			if(update.current){
				d3.selectAll('g').remove()
			} else {update.current = true}
		})

		// Draw chart using the data and updated dimensions
		DrawChart(chartData,dimensions);

        return(() => {
            window.removeEventListener('resize',()=>{})
        })

	},[dimensions,chartData]);


    const margin = {top: 10, right:30, bottom: 30, left:60}
	function DrawChart(data, dimensions){

		

		const chartwidth = parseInt(d3.select('.d3Container').style('width')) - margin.left - margin.right
		const chartheight = parseInt(d3.select('.d3Container').style('height')) - margin.top - margin.bottom

        console.log({chartwidth,chartheight});

		const svg = d3.select(d3Chart.current)
						.attr('width', chartwidth + margin.left + margin.right)
						.attr('height', chartheight + margin.top + margin.bottom)

		// x scale
		const x = d3.scaleBand()
					.domain(d3.range(data.length))
					.range([margin.left, chartwidth - margin.right])
					.padding(0.1)

		svg.append('g')
			.attr('transform', 'translate(0,'+ chartheight + ')')
			.call(d3.axisBottom(x).tickFormat(i=>data[i].movie).tickSizeOuter(0))
        

		const max = d3.max(data, function(d){return d.value})

		// y scale
		const y = d3.scaleLinear()
					.domain([0, max])
					.range([chartheight, margin.top])

		svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',0)')
			.call(d3.axisLeft(y))

		// Draw bars
		svg.append('g')
			.attr('fill','#65f0eb')
			.selectAll('rect')
			.data(data)
			.join('rect')
				.attr('x', (d,i) => x(i))
				.attr('y', d => y(d.value))
				.attr('height', d=>y(0)-y(d.value))
				.attr('width', x.bandwidth())

                // svg.append("text")
                // .attr("transform", "translate(100,0)")
                // .attr("x", 50)
                // .attr("y", 50)
                // .attr("font-size", "24px")
                // .text("XYZ Foods Stock Price")


        svg.selectAll("rect")
        .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .attr("height", function(d) { return chartheight - y(d.value); });



        
        svg.append("text")             
        .attr("transform",
                "translate(" + (chartwidth/2) + " ," + 
                                (chartheight + margin.top + 20) + ")")
                                .style("text-anchor", "middle"  )
                                .style("color", "white"  )
        .text("Movies");
	}
    return (
            <div className='d3Container'>
                <svg ref={d3Chart}></svg>
            </div>
    )
}

export default Chart
