function main() {
	var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Density of the Countries")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
            .attr("transform", "translate(" + 150 + "," + 150 + ")");

    d3.csv("../data/worldpopulation.csv").then( function(data) {
        xScale.domain(data.map(function(d) { return d.Country; }));
        yScale.domain([0, d3.max(data, function(d) { return d.Density; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
		 //.attr("transform", "rotate(-90)")
         .attr("y", 40)
         .attr("x", (height/2)+250)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Countries");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){return d;}).ticks(10))
	 .append("text")
	 .attr("transform", "rotate(-90)")
	 .attr("y", 10)
	 .attr('dy', '-5em')
	 .attr("x", -(height/2)+100)
	 .attr('text-anchor', 'end')
	 .attr('stroke', 'black')
	 .text('Density in numbers')

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.Country); })
         .attr("y", function(d) { return yScale(d.Density); })
         .attr("width", xScale.bandwidth())
	 .transition()
	 .ease(d3.easeLinear)
	 .duration(500)
	 .delay(function(d,i){ return i * 300})
         .attr("height", function(d) { return height - yScale(d.Density); });
	})
       
	
}