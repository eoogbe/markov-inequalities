var Markov = (function(my){
    var trunc10 = d3.format(".10g");
    
    my.TableView = function(model) {
        model.addListener(this);
    };
    
    my.TableView.prototype.modelUpdated = function(model) {
        var expectedValue = model.expectedValue,
            data = model.data;
        
        d3.select("#expected-value").text(trunc10(expectedValue));
        
        var markovTableRow = d3.select("#markov-table")
            .select("tbody")
            .selectAll("tr")
            .data(data, function(d) { return JSON.stringify(d); });
        
        markovTableRow.enter().append("tr");
        
        markovTableRow.append("th")
            .attr("scope", "row")
            .text(function(d, i){ return i + 1; });
        
        markovTableRow.append("td")
            .append("input")
                .attr("type", "number")
                .attr("name", function(d, i){ return "pmf" + i; })
                .attr("value", function(d){ return d.outcome; })
                .attr("min", "0")
                .classed("form-control", true);
        
        markovTableRow.append("td")
            .text(function(d){ return trunc10(d.pmf); });
        markovTableRow.append("td")
            .text(function(d){ return trunc10(d.weightedProb); });
        markovTableRow.append("td")
            .text(function(d){ return trunc10(d.markov); });
        markovTableRow.append("td")
            .text(function(d){ return trunc10(d.cmf); });
        
        markovTableRow.exit().remove();
    };
    
    return my;
})(Markov || {});
