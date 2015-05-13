var Markov = (function(my){
    my.Controller = function(model, view) {
        this.model = model;
        this.view = view;
        
        var controller = this,
            ENTER_KEY = 13;
        
        view.on("blur", "input", function(){
            if (d3.select(this).data()[0].outcome != this.value){
                setTimeout(function(){
                    controller.handleInputBlur();
                }, 100);
            }
        }).on("keyup", "input", function(e){
            if (e.which === ENTER_KEY) {
                var rowIdx = ($(this).closest("tr").index() + 1) % NUM_VALUES;
                controller.inputAt(rowIdx).focus();
            }
        });
    };
    
    my.Controller.prototype.inputAt = function(idx) {
        return this.view.children("tr").eq(idx).find("input");
    };
    
    my.Controller.prototype.handleInputBlur = function() {
        var rowIdx = this.view.find(":focus").closest("tr").index();
        this.updateModel();
        if (rowIdx >= 0) {
            this.inputAt(rowIdx).select();
        }
    };
    
    my.Controller.prototype.updateModel = function() {
        var outcomes = [];
        this.view.find("input").each(function(){
            outcomes.push(parseInt(this.value));
        });
        this.model.update(outcomes);
    };

    return my;
})(Markov || {});
