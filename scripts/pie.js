var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2;
        
var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['#D2B4DE','#AED6F1 ','#CD6155 ','#F7DC6F','#1E8449 ','#FDEDEC  ','#D0ECE7 ','#FAD7A0 ',]);

var pie = d3.pie().value(function(d) { 
        return d.FertilityRate; 
    });

var path = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

var label = d3.arc()
                .outerRadius(radius)
                .innerRadius(radius - 100);
                
var arcOver = d3.arc().outerRadius(radius + 10).innerRadius(radius - 220);

d3.csv("../data/worldpopulation.csv", function(error, data) {
    if (error) {
        throw error;
    }

    var arc = g.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.Country); });

    //console.log(arc)
    

    arc.append("text")
        .attr("transform", function(d) { 
                return "translate(" + label.centroid(d) + ")"; 
        })
        .text(function(d) { return d.data.Country + " " + d.data.FertilityRate + "%"; });
    
    var legendG = g.selectAll(".legend")
      .data(pie(data))
      .enter().append("g")
      .attr("transform", function(d,i){
        return "translate(" + (width - 10) + "," + (i * 15 - 60) + ")";
      })
      .attr("class", "legend");   
    
    legendG.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", function(d) {
        return color(d.data.Country);
      });
    
    legendG.append("text")
      .text(function(d){
        return d.data.Country;
      })
      .style("font-size", 5)
      .attr("y", 10)
      .attr("x", 11);
    
    arc.on("mouseenter", function (d) {
            d3.select(this).selectAll('path')
                .transition()
                .duration(100)
                .attr("d", arcOver);
            })
        .on("mouseleave", function (d) {
            d3.select(this).selectAll('path')
                .transition()
                .duration(200)
                .attr("d", path);
            })
    });

    

svg.append("g")
    .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
    .append("text")
    
    .attr("class", "title")