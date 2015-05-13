var Markov = (function(my){
    var trunc10 = d3.format(".5g");
    
    my.ChartView = function(model, dimensions) {
        model.addListener(this);
        
        var margin = { top: 20, right: 30, bottom: 30, left: 40 };
        this.width = dimensions.width - margin.left - margin.right;
        this.height = dimensions.height - margin.top - margin.bottom;
        this.chart = d3.select("#markov-chart")
            .attr("width", this.width + margin.left + margin.right)
            .attr("height", this.height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        this.xAxisContainer = this.chart.append("g")
            .attr("transform", "translate(0," + this.height + ")");
        this.yAxisContainer = this.chart.append("g")
            .attr("class", "y");
    };
    
    my.ChartView.prototype.modelUpdated = function(model) {
        var data = model.data;
        var x = d3.scale.ordinal()
            .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
            .rangeRoundBands([0, this.width]);
        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.pmf; })])
            .range([this.height + 1, 0])
            .nice();
        var barWidth = this.width / data.length;
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickSize(-this.height, 1)
            .tickPadding(5);
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickSize(-this.width, 1)
            .tickPadding(5)
            .ticks(10);
        var tip = d3.tip()
            .attr("class", "d3-tip")
            .html(function(d) { return trunc10(d.pmf); });
        
        this.chart.call(tip);
        this.xAxisContainer.call(xAxis);
        this.yAxisContainer.call(yAxis);
        
        var bars = this.chart.selectAll("rect")
            .data(data);
        
        bars.enter().append("rect")
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
            .attr("width", barWidth - 1)
            .classed("bar", true)
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide);
        
        var chartView = this;
        bars.transition()
            .duration(600)
            .attr("y", function(d) { return y(d.pmf); })
            .attr("height", function(d) { return Math.max(0, chartView.height - y(d.pmf)); });
    };

    return my;
})(Markov || {});
