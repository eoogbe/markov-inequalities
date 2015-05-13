$(function(){
    var model = new Markov.Model();
    var tableView = new Markov.TableView(model);
    var chartView = new Markov.ChartView(model, { width: 480, height: 500 });
    var controller = new Markov.Controller(model, $("#markov-table > tbody"));
    model.update();
});
