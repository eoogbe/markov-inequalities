var Markov = (function(my){
    var MAX_INITIAL_OUTCOME_COUNT = 30,
        NUM_VALUES = 12;
    
    function nextOutcome() {
        return Math.floor(Math.random() * MAX_INITIAL_OUTCOME_COUNT);
    }
    
    my.Model = function() {
        this.listeners = [];
    };
    
    my.Model.prototype.update = function(outcomes) {
        this.expectedValue = 0;
        this.data = [];
        
        var totalOutcomes = 0;
        
        for (var i = 0; i < NUM_VALUES; ++i) {
            this.data.push({});
            
            var outcome = outcomes ? outcomes[i] : nextOutcome();
            this.data[i].outcome = outcome;
            totalOutcomes += outcome;
        }
        
        for (var i = 0; i < NUM_VALUES; ++i) {
            var pmf = this.data[i].outcome / totalOutcomes;
            this.data[i].pmf = pmf;
            
            var weightedProb = pmf * (i + 1);
            this.data[i].weightedProb = weightedProb;
            this.expectedValue += weightedProb;
            
            if (i === 0) {
                this.data[i].cmf = 1;
            } else {
                this.data[i].cmf = this.data[i - 1].cmf - this.data[i - 1].pmf;
            }
        }
        
        for (var i = 0; i < NUM_VALUES; ++i) {
            this.data[i].markov = this.expectedValue / (i + 1);
        }
        
        this.notifyListeners();
    };
    
    my.Model.prototype.notifyListeners = function() {
        var model = this;
        this.listeners.forEach(function(listener) {
            listener.modelUpdated(model);
        });
    };
    
    my.Model.prototype.addListener = function(listener) {
        this.listeners.push(listener);
    };

    return my;
})(Markov || {});
